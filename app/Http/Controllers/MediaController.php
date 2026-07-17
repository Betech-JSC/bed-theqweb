<?php

namespace App\Http\Controllers;

use App\Models\MediaFolder;
use App\Models\MediaFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class MediaController extends Controller
{
    /**
     * Get folder contents (folders and files).
     */
    public function index(Request $request)
    {
        $folderId = $request->get('folder_id');
        if ($folderId === 'null' || $folderId === '') {
            $folderId = null;
        }

        $folders = MediaFolder::where('parent_id', $folderId)->orderBy('name')->get();
        $files = MediaFile::where('folder_id', $folderId)->orderBy('name')->get();

        // Build breadcrumbs
        $breadcrumbs = [];
        if ($folderId) {
            $current = MediaFolder::find($folderId);
            while ($current) {
                array_unshift($breadcrumbs, [
                    'id' => $current->id,
                    'name' => $current->name
                ]);
                $current = $current->parent_id ? MediaFolder::find($current->parent_id) : null;
            }
        }

        return response()->json([
            'folders' => $folders,
            'files' => $files,
            'breadcrumbs' => $breadcrumbs,
            'current_folder_id' => $folderId,
            'all_folders' => MediaFolder::orderBy('name')->get()
        ]);
    }

    /**
     * Create a new folder.
     */
    public function createFolder(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:media_folders,id',
        ]);

        $folder = MediaFolder::create([
            'name' => $validated['name'],
            'parent_id' => $validated['parent_id'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'folder' => $folder
        ]);
    }

    /**
     * Delete a folder and all its contents physically.
     */
    public function deleteFolder(MediaFolder $folder)
    {
        $this->deletePhysicalFolderContents($folder);
        $folder->delete();

        return response()->json([
            'success' => true
        ]);
    }

    /**
     * Upload a file into a folder.
     */
    public function upload(Request $request)
    {
        try {
            $request->validate([
                'file' => 'required|file|max:10240', // Max 10MB
                'folder_id' => 'nullable|exists:media_folders,id',
            ]);
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $originalName = $file->getClientOriginalName();
                $filename = pathinfo($originalName, PATHINFO_FILENAME) . '_' . time() . '.' . $file->getClientOriginalExtension();
                
                // Get metadata before moving
                $mimeType = $file->getClientMimeType();
                $size = $file->getSize();

                // Put in public/uploads/media
                $destinationPath = public_path('uploads/media');
                if (!File::exists($destinationPath)) {
                    if (!File::makeDirectory($destinationPath, 0755, true)) {
                        throw new \Exception("Không thể tạo thư mục public/uploads/media. Vui lòng kiểm tra quyền ghi của thư mục.");
                    }
                }
                
                $file->move($destinationPath, $filename);
                $path = '/uploads/media/' . $filename;

                $mediaFile = MediaFile::create([
                    'folder_id' => $request->get('folder_id') ?: null,
                    'name' => $originalName,
                    'path' => $path,
                    'mime_type' => $mimeType,
                    'size' => $size,
                ]);

                return response()->json([
                    'success' => true,
                    'file' => $mediaFile
                ]);
            }

            return response()->json(['error' => 'Không tìm thấy tệp để tải lên.'], 400);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Lỗi tải tệp: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete a single media file.
     */
    public function destroy(MediaFile $file)
    {
        $physicalPath = public_path($file->path);
        if (File::exists($physicalPath)) {
            File::delete($physicalPath);
        }

        $file->delete();

        return response()->json([
            'success' => true
        ]);
     }

    /**
     * Delete multiple media files.
     */
    public function bulkDestroy(Request $request)
    {
        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:media_files,id'
        ]);

        foreach ($validated['ids'] as $id) {
            $file = MediaFile::find($id);
            if ($file) {
                $physicalPath = public_path($file->path);
                if (File::exists($physicalPath)) {
                    File::delete($physicalPath);
                }
                $file->delete();
            }
        }

        return response()->json([
            'success' => true
        ]);
    }

    /**
     * Helper to recursively delete physical files.
     */
    private function deletePhysicalFolderContents(MediaFolder $folder)
    {
        // Delete files in this folder
        foreach ($folder->files as $file) {
            $physicalPath = public_path($file->path);
            if (File::exists($physicalPath)) {
                File::delete($physicalPath);
            }
        }

        // Recursively handle subfolders
        foreach ($folder->children as $subfolder) {
            $this->deletePhysicalFolderContents($subfolder);
        }
    }
}
