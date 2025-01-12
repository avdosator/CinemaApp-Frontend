import { useState } from "react";

export default function PhotosUpload() {
    const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);
    const [coverPhotoIndex, setCoverPhotoIndex] = useState<number | null>(null);
    return (
        <div>
            
        </div>
    );
}