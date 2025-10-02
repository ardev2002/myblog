"use client";
import React, { Ref, useRef } from 'react';
import { remove, uploadData } from 'aws-amplify/storage';
import { UploadCloud, Upload, Trash2, Info } from 'lucide-react';
import TaggedTextarea from './TaggedTextArea';
import { inputValidator } from '@/utils/inputValidator';

export default function AddSection({ sections, handleSectionChange }: any) {
  const handleFileSelection = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      handleSectionChange(index, 'previewUrl', reader.result);
    };
    reader.readAsDataURL(file);
    handleSectionChange(index, 'imageFile', file);
  };

  const handleImageUpload = async (index: number) => {
    const file = sections[index].imageFile;
    if (!file) return;

    try {
      const key = `media/${Date.now()}-${file.name}`;
      const result = await uploadData({
        path: key,
        data: file,
        options: {
          bucket: 'gyanrexa',
          contentType: file.type,
          onProgress: ({ transferredBytes, totalBytes }) => {
            const percent = Math.round((transferredBytes / totalBytes!) * 100);
            handleSectionChange(index, 'uploadProgress', percent);
          },
        },
      }).result;

      handleSectionChange(index, 'imgUrl', result.path);
    } catch (err) {
      console.error('Upload failed', err);
      handleSectionChange(index, 'uploadProgress', 0);
    }
  };

  const removeImage = async (index: number) => {
    const imgUrl = sections[index].imgUrl;
    const bucketName = 'gyanrexa';

    try {
      if (imgUrl) {
        await remove({
          path: imgUrl,
          options: { bucket: bucketName },
        });
      }
    } catch (error) {
      console.error('Error removing image from S3:', error);
    }

    handleSectionChange(index, 'imageFile', null);
    handleSectionChange(index, 'previewUrl', '');
    handleSectionChange(index, 'uploadProgress', 0);
    handleSectionChange(index, 'imgUrl', '');
  };

  return (
    <div className="space-y-8 mt-6">
      {sections.map((section: any, index: number) => (
        <div key={index} className="p-4 bg-base-100 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Section {index + 1}</h2>

          {/* Subheading */}
          <div className='mb-4'>
            <label className="label font-semibold mb-1">Section Title</label>
            <div className="relative">
              <input
                type="text"
                value={section.subheading}
                onKeyDown={(e) => inputValidator(e, 'title')}
                onChange={(e) =>
                  handleSectionChange(index, "subheading", e.target.value)
                }
                className="input input-bordered w-full pr-10"
                placeholder="Enter section subheading"
              />
              <div
                className="tooltip tooltip-left absolute right-2 top-1/2 -translate-y-1/2"
                data-tip="Give a short title for this section"
              >
                <Info className="w-5 h-5 text-gray-500 cursor-pointer" />
              </div>
            </div>
          </div>

          <TaggedTextarea
            value={section.paragraph}
            onChange={(val: any) => handleSectionChange(index, "paragraph", val)}
          />

          {/* Image Upload UI */}
          <div className="mb-4">
            <div className={`relative border-2 border-dashed rounded-lg p-6 text-center transition cursor-pointer ${section.imageFile
              ? 'bg-base-200 opacity-60 grayscale pointer-events-none'
              : 'border-primary hover:bg-base-200 text-primary'
              }`}>
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={!!section.imageFile}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelection(index, file);
                  e.target.value = "";
                }}
              />

              <div className="flex flex-col items-center justify-center text-primary">
                <UploadCloud className="w-8 h-8 mb-2" />
                <span className="font-medium">Click or drag to select image</span>
              </div>
            </div>

            {section.previewUrl && (
              <div className="mt-4 flex items-center gap-6 justify-center">
                {/* Image Preview */}
                <img
                  src={section.previewUrl}
                  alt="Preview"
                  className="w-48 h-48 object-contain rounded-lg shadow"
                />

                {/* Buttons stacked vertically */}
                <div className="flex flex-col gap-2">
                  {!section.imgUrl && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline btn-primary flex items-center gap-2"
                      onClick={() => handleImageUpload(index)}
                    >
                      <Upload className="w-4 h-4" />
                      Upload Image
                    </button>
                  )}

                  <button
                    type="button"
                    className="btn btn-sm btn-outline btn-error flex items-center gap-2"
                    onClick={() => removeImage(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove Image
                  </button>

                  {section.imgUrl && (
                    <progress
                      className="progress progress-success w-full mt-2"
                      value={section.uploadProgress}
                      max="100"
                    />
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      ))}
    </div>
  );
}
