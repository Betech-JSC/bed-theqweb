import React, { useState, useEffect } from "react";
import { Link, Head, useForm, usePage } from "@inertiajs/react";
import { Header } from "@/Components/Header";
import { Footer } from "@/Components/Footer";
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Sparkles, CheckCircle2, User } from "lucide-react";

interface DoctorItem {
  id: number;
  name: string;
  role: string;
}

interface BookedSlot {
  booking_date: string;
  booking_time: string;
  doctor_id: number | null;
  branch: string | null;
}

export default function DatLich() {
  const { props } = usePage();
  const doctors = (props.doctors as DoctorItem[]) || [];

  // Form setup
  const { data, setData, post, processing, reset, wasSuccessful } = useForm({
    name: "",
    phone: "",
    email: "",
    branch: "",
    service: "",
    booking_date: "",
    booking_time: "",
    doctor_id: "",
    note: "",
  });

  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [now, setNow] = useState(new Date());

  // Update current time every 15 seconds for real-time validation of time slots
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  // Doctor schedule state
  const [doctorShifts, setDoctorShifts] = useState<any[]>([]);
  const [doctorBookings, setDoctorBookings] = useState<any[]>([]);

  // Fetch booked slots from API
  useEffect(() => {
    setIsLoadingSlots(true);
    fetch("/api/booked-slots")
      .then((res) => res.json())
      .then((data) => {
        setBookedSlots(data);
        setIsLoadingSlots(false);
      })
      .catch((err) => {
        console.error("Failed to load booked slots", err);
        setIsLoadingSlots(false);
      });
  }, []);

  // Fetch doctor shifts & bookings when doctor changes
  useEffect(() => {
    if (data.doctor_id) {
      setIsLoadingSlots(true);
      fetch(`/api/doctor-schedule?doctor_id=${data.doctor_id}&branch=${data.branch}`)
        .then((res) => res.json())
        .then((resData) => {
          setDoctorShifts(resData.shifts || []);
          setDoctorBookings(resData.bookings || []);
          setIsLoadingSlots(false);
        })
        .catch((err) => {
          console.error("Failed to load doctor schedule", err);
          setIsLoadingSlots(false);
        });
    } else {
      setDoctorShifts([]);
      setDoctorBookings([]);
    }
  }, [data.doctor_id, data.branch]);

  // Validation hook when doctor shift updates
  useEffect(() => {
    if (data.booking_date && data.doctor_id && doctorShifts.length > 0) {
      const selectedDate = new Date(data.booking_date);
      const jsDay = selectedDate.getDay();
      const dbDay = jsDay === 0 ? 7 : jsDay;
      const isWorking = doctorShifts.some(shift => Number(shift.day_of_week) === dbDay);
      if (!isWorking) {
        setData(data => ({ ...data, booking_date: "", booking_time: "" }));
      }
    }
  }, [doctorShifts]);

  // Helper to check if doctor works on a specific day of week
  const isDoctorWorkingOnDay = (date: Date) => {
    if (!data.doctor_id || doctorShifts.length === 0) return true; // No restriction if no doctor or shifts defined
    
    // JS getDay(): 0 = CN, 1 = T2, ..., 6 = T7
    // DB day_of_week: 1 = T2, 2 = T3, ..., 7 = CN
    const jsDay = date.getDay();
    const dbDay = jsDay === 0 ? 7 : jsDay;
    
    return doctorShifts.some(shift => Number(shift.day_of_week) === dbDay);
  };

  // Helper to check if time slot is within doctor's shift
  const isTimeInDoctorShift = (dateStr: string, timeStr: string) => {
    if (!data.doctor_id || !dateStr || doctorShifts.length === 0) return true;
    
    const dateObj = new Date(dateStr);
    const jsDay = dateObj.getDay();
    const dbDay = jsDay === 0 ? 7 : jsDay;
    
    const activeShift = doctorShifts.find(shift => Number(shift.day_of_week) === dbDay);
    if (!activeShift) return false;
    
    // Compare time strings "HH:MM"
    return timeStr >= activeShift.start_time && timeStr <= activeShift.end_time;
  };

  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30", "20:00"
  ];

  // Helper to format Date as YYYY-MM-DD
  const formatDateString = (date: Date) => {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    return adjustedDate.toISOString().split("T")[0];
  };

  const selectedDateStr = data.booking_date;

  const isTimeSlotPassed = (timeStr: string) => {
    if (!selectedDateStr) return false;
    
    const todayStr = formatDateString(now);
    if (selectedDateStr !== todayStr) return false;

    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    const [slotHour, slotMinute] = timeStr.split(":").map(Number);
    
    if (slotHour < currentHour) return true;
    if (slotHour === currentHour && slotMinute <= currentMinute) return true;
    
    return false;
  };

  // Reset booking time if selected time slot passes in real-time
  useEffect(() => {
    if (selectedDateStr && data.booking_time) {
      if (isTimeSlotPassed(data.booking_time)) {
        setData("booking_time", "");
      }
    }
  }, [now, selectedDateStr, data.booking_time]);

  // Calendar calculation
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const startingDay = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday etc.
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Shift starting day so 0 is Monday, 6 is Sunday
  const startOffset = startingDay === 0 ? 6 : startingDay - 1;

  const monthNames = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleSelectDay = (day: number) => {
    const targetDate = new Date(year, month, day);
    const dateStr = formatDateString(targetDate);
    setData(data => ({ ...data, booking_date: dateStr, booking_time: "" }));
  };

  // Check if a specific slot is booked
  const isSlotBooked = (dateStr: string, timeStr: string) => {
    if (!dateStr || !timeStr) return false;
    return bookedSlots.some(
      (slot) =>
        slot.booking_date === dateStr &&
        slot.booking_time === timeStr &&
        (!data.doctor_id || slot.doctor_id === Number(data.doctor_id)) &&
        (!data.branch || slot.branch === data.branch)
    );
  };

  // Get booked slots count for a specific date
  const getBookedCountForDate = (dateStr: string) => {
    return bookedSlots.filter(
      (slot) =>
        slot.booking_date === dateStr &&
        (!data.doctor_id || slot.doctor_id === Number(data.doctor_id)) &&
        (!data.branch || slot.branch === data.branch)
    ).length;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name || !data.phone || !data.branch || !data.booking_date || !data.booking_time) return;
    post("/consult", {
      onSuccess: () => {
        reset();
      },
      preserveScroll: true,
    });
  };

  // Days array for calendar grid
  const days = [];
  for (let i = 0; i < startOffset; i++) {
    days.push(null); // empty cells before first day
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const dayOfWeekNames = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  return (
    <>
      <Head title="Đặt Lịch Hẹn Khám & Tư Vấn | KT Beauty" />
      <Header forceWhiteBg={true} />

      <main className="flex-grow font-sans bg-gray-55/30 pt-44 md:pt-52 pb-24 text-left">
        <div className="max-w-[1440px] mx-auto px-4 md:px-12 lg:px-20">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gray-400 mb-12 font-medium">
            <Link href="/" className="hover:text-gold transition-colors">Trang chủ</Link>
            <ChevronRight size={10} />
            <span className="text-gray-500">Đặt lịch hẹn</span>
          </div>

          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-gold uppercase tracking-widest text-xs font-bold mb-3 block">
              Hệ thống đặt lịch thông minh
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-serif text-gray-850 tracking-wide mb-4">
              Đặt Lịch Hẹn Khám
            </h1>
            <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed">
              Chọn thời gian và bác sĩ thăm khám mong muốn. Lịch hẹn của bạn sẽ được xác nhận ngay lập tức qua cuộc gọi từ trợ lý bác sĩ.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Interactive Calendar (7/12 cols) */}
            <div className="lg:col-span-7 bg-white rounded-[32px] p-6 md:p-10 border border-gold/15 shadow-sm">
              <h2 className="text-lg font-serif font-bold text-gray-800 mb-6 flex items-center gap-2 pb-3 border-b border-gray-100">
                <Calendar size={18} className="text-gold" />
                1. Chọn Ngày Hẹn Trực Tuyến
              </h2>

              {/* Month Selector bar */}
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-serif font-bold text-gray-800 text-lg">
                  {monthNames[month]} - {year}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={handlePrevMonth}
                    className="p-2 border border-gray-200 rounded-xl hover:bg-gold/10 hover:text-gold transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 border border-gray-200 rounded-xl hover:bg-gold/10 hover:text-gold transition-colors cursor-pointer"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Days Header */}
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">
                {dayOfWeekNames.map((name) => (
                  <div key={name}>{name}</div>
                ))}
              </div>

              {/* Calendar Days Grid */}
              <div className="grid grid-cols-7 gap-3">
                {days.map((day, idx) => {
                  if (day === null) {
                    return <div key={`empty-${idx}`} className="aspect-square" />;
                  }

                  const dateObj = new Date(year, month, day);
                  const dateStr = formatDateString(dateObj);
                  const isSelected = selectedDateStr === dateStr;
                  const isToday = formatDateString(new Date()) === dateStr;
                  const isPast = dateObj < new Date(new Date().setHours(0, 0, 0, 0));
                  const isWorkingDay = isDoctorWorkingOnDay(dateObj);
                  const bookingsCount = getBookedCountForDate(dateStr);
                  const isFullyBooked = bookingsCount >= 5;
                  const isDisabled = isPast || !isWorkingDay || isFullyBooked;
                  
                  let stateColor = "bg-gray-50/50 text-gray-700 hover:bg-gold/10 hover:text-gold border-gray-100";
                  
                  if (isPast || !isWorkingDay) {
                    stateColor = "bg-gray-100/30 text-gray-300 cursor-not-allowed pointer-events-none";
                  } else if (isFullyBooked) {
                    stateColor = "bg-red-50/60 text-red-400 border-red-100 cursor-not-allowed pointer-events-none";
                  } else if (isSelected) {
                    stateColor = "bg-gold text-white border-gold shadow-md";
                  } else if (isToday) {
                    stateColor = "border-2 border-gold text-gold font-bold bg-gold/5";
                  }

                  return (
                    <button
                      key={`day-${day}`}
                      onClick={() => handleSelectDay(day)}
                      disabled={isDisabled}
                      title={isFullyBooked ? "Ngày đã đầy lịch hẹn" : undefined}
                      className={`aspect-square rounded-2xl border flex flex-col items-center justify-center relative p-1 transition-all text-sm font-semibold select-none cursor-pointer ${stateColor}`}
                    >
                      <span>{day}</span>
                      
                      {/* Dots representation for booked slots */}
                      {bookingsCount > 0 && !isPast && (
                        <span className={`w-1.5 h-1.5 rounded-full absolute bottom-2 ${isFullyBooked ? 'bg-red-400' : isSelected ? 'bg-white' : 'bg-gold'}`} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend Indicator */}
              <div className="flex gap-6 justify-center mt-8 pt-6 border-t border-gray-100 text-xs text-gray-400 font-light flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-gold border border-gold" />
                  <span>Đang chọn</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded border border-gold bg-gold/5" />
                  <span>Ngày hôm nay</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-red-50 border border-red-100" />
                  <span>Đã đầy lịch hẹn</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span>Có lịch đặt</span>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Form (5/12 cols) */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-white rounded-[32px] p-8 border border-gold/15 shadow-sm">
                <h2 className="text-lg font-serif font-bold text-gray-800 mb-6 flex items-center gap-2 pb-3 border-b border-gray-100">
                  <Clock size={18} className="text-gold" />
                  2. Thông Tin Đăng Ký Hẹn
                </h2>

                {wasSuccessful ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
                      <CheckCircle2 size={32} />
                    </div>
                    <h4 className="font-bold text-gray-800 text-base mb-1.5">Đặt Lịch Hẹn Thành Công!</h4>
                    <p className="text-xs text-gray-500 font-light leading-relaxed max-w-[240px] mx-auto">
                      Cảm ơn bạn đã lựa chọn dịch vụ của KT Beauty. Chúng tôi sẽ gọi lại xác thực lịch của bạn trong vòng 15 phút.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Selected Date Indicator Display */}
                    <div className="p-4 bg-gold/5 rounded-2xl border border-gold/15 mb-4 text-xs font-semibold flex items-center gap-3">
                      <Calendar size={18} className="text-gold" />
                      <div>
                        <span className="text-gray-400 block font-light">Ngày hẹn đã chọn</span>
                        <span className="text-gray-700 text-sm font-bold">
                          {selectedDateStr ? new Date(selectedDateStr).toLocaleDateString("vi-VN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Chưa chọn ngày trên bản đồ lịch"}
                        </span>
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5 block">Họ và tên *</label>
                      <input
                        type="text"
                        placeholder="Nhập họ tên của bạn"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full bg-gray-50/50 border border-gray-200 focus:border-gold/80 px-4 py-3 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none transition-all text-sm focus:ring-1 focus:ring-gold/30"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5 block">Số điện thoại *</label>
                      <input
                        type="tel"
                        placeholder="Nhập số điện thoại"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value.replace(/[^0-9]/g, ""))}
                        className="w-full bg-gray-50/50 border border-gray-200 focus:border-gold/80 px-4 py-3 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none transition-all text-sm focus:ring-1 focus:ring-gold/30"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5 block">Email (Không bắt buộc)</label>
                      <input
                        type="email"
                        placeholder="Nhập địa chỉ email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="w-full bg-gray-50/50 border border-gray-200 focus:border-gold/80 px-4 py-3 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none transition-all text-sm focus:ring-1 focus:ring-gold/30"
                      />
                    </div>

                    {/* Branch select */}
                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5 block">Cơ sở thăm khám *</label>
                      <div className="relative">
                        <select
                          value={data.branch}
                          onChange={(e) => setData("branch", e.target.value)}
                          className="w-full bg-gray-50/50 border border-gray-200 focus:border-gold/80 px-4 py-3 rounded-xl text-gray-700 focus:outline-none transition-all text-sm focus:ring-1 focus:ring-gold/30 appearance-none cursor-pointer"
                          required
                        >
                          <option value="">Chọn chi nhánh gần bạn *</option>
                          <option value="KT Beauty - Sài Gòn">KT Beauty - Sài Gòn</option>
                          <option value="Văn phòng hợp tác Úc Châu">Văn phòng hợp tác Úc Châu</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
                          ▼
                        </div>
                      </div>
                    </div>

                    {/* Doctor select */}
                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5 block">Bác sĩ mong muốn (Không bắt buộc)</label>
                      <div className="relative">
                        <select
                          value={data.doctor_id}
                          onChange={(e) => setData("doctor_id", e.target.value)}
                          className="w-full bg-gray-50/50 border border-gray-200 focus:border-gold/80 px-4 py-3 rounded-xl text-gray-700 focus:outline-none transition-all text-sm focus:ring-1 focus:ring-gold/30 appearance-none cursor-pointer"
                        >
                          <option value="">Chọn bác sĩ khám</option>
                          {doctors.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.name} ({d.role})
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
                          ▼
                        </div>
                      </div>
                    </div>

                    {/* Service Selection */}
                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5 block">Dịch vụ quan tâm</label>
                      <div className="relative">
                        <select
                          value={data.service}
                          onChange={(e) => setData("service", e.target.value)}
                          className="w-full bg-gray-50/50 border border-gray-200 focus:border-gold/80 px-4 py-3 rounded-xl text-gray-700 focus:outline-none transition-all text-sm focus:ring-1 focus:ring-gold/30 appearance-none cursor-pointer"
                        >
                          <option value="">Chọn dịch vụ điều trị</option>
                          <option value="Phẫu thuật thẩm mỹ">Phẫu thuật thẩm mỹ</option>
                          <option value="Cấy tóc y khoa">Cấy tóc y khoa</option>
                          <option value="Da liễu & Trẻ hóa">Da liễu & Trẻ hóa</option>
                          <option value="Dịch vụ khác">Dịch vụ khác</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
                          ▼
                        </div>
                      </div>
                    </div>

                    {/* Time Slot Select */}
                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5 block">Giờ hẹn *</label>
                      <div className="grid grid-cols-4 gap-2">
                        {timeSlots.map((time) => {
                          const booked = isSlotBooked(selectedDateStr, time);
                          const inShift = isTimeInDoctorShift(selectedDateStr, time);
                          const passed = isTimeSlotPassed(time);
                          const isAvailable = inShift && !booked && !passed;
                          const isSelected = data.booking_time === time;
                          
                          let btnStyle = "bg-gray-50 border-gray-200 hover:bg-gold/15 hover:border-gold/50 text-gray-700";
                          if (!isAvailable) {
                            btnStyle = "bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed line-through pointer-events-none";
                          } else if (isSelected) {
                            btnStyle = "bg-gold text-white border-gold shadow-sm font-bold";
                          }

                          return (
                            <button
                              key={time}
                              type="button"
                              disabled={!isAvailable || !selectedDateStr}
                              onClick={() => setData("booking_time", time)}
                              className={`py-2 px-1 text-xs border rounded-xl font-medium transition-all cursor-pointer ${btnStyle} ${!selectedDateStr ? "opacity-40 cursor-not-allowed" : ""}`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                      {!selectedDateStr && (
                        <span className="text-[10px] text-gray-400 font-light mt-1 block">
                          * Vui lòng chọn ngày trước trên bản đồ lịch để xem giờ trống.
                        </span>
                      )}
                    </div>

                    {/* Note */}
                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5 block">Ghi chú thêm</label>
                      <textarea
                        rows={2}
                        placeholder="Nhập ghi chú hoặc tình trạng sức khỏe của bạn..."
                        value={data.note}
                        onChange={(e) => setData("note", e.target.value)}
                        className="w-full bg-gray-50/50 border border-gray-200 focus:border-gold/80 px-4 py-3 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none transition-all text-sm"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={processing || !selectedDateStr || !data.booking_time}
                        className="w-full bg-gold hover:bg-gold-dark text-white font-bold py-3.5 rounded-xl transition-all duration-300 text-sm shadow-md hover:shadow-gold/25 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 select-none cursor-pointer"
                      >
                        {processing ? "Đang gửi đăng ký..." : "Gửi Đăng Ký Lịch Hẹn"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
