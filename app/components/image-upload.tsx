"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"

interface ImageUploadProps {
  onImageChange: (file: File | null, previewUrl: string | null) => void
  disabled?: boolean
  currentImageUrl?: string
}

export function ImageUpload({ onImageChange, disabled = false, currentImageUrl }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    setUploadError(null)

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image size must be less than 5MB")
      return
    }

    // Create preview URL
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    onImageChange(file, url)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (disabled) return

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleRemoveImage = () => {
    setPreviewUrl(null)
    setUploadError(null)
    onImageChange(null, null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleClickUpload = () => {
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }

  return (
    <div className="space-y-4">
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          isDragging
            ? "border-blue-400 bg-blue-50"
            : uploadError
              ? "border-red-300 bg-red-50"
              : "border-gray-300 hover:border-gray-400"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClickUpload}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={disabled}
        />

        {previewUrl ? (
          <div className="relative">
            <div className="relative h-48 w-full rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={previewUrl || "/placeholder.svg"}
                alt="Product preview"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleRemoveImage()
              }}
              disabled={disabled}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="mt-3 text-center">
              <p className="text-sm text-gray-600">Click to change image or drag a new one here</p>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <div className="mt-4">
              <p className="text-lg font-medium text-gray-900">Upload product image</p>
              <p className="text-sm text-gray-600 mt-1">Drag and drop an image here, or click to select</p>
            </div>
            <div className="mt-4">
              <span className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Choose Image
              </span>
            </div>
          </div>
        )}
      </div>

      {uploadError && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {uploadError}
        </div>
      )}

      <div className="text-sm text-gray-500">
        <p className="font-medium mb-1">Image requirements:</p>
        <ul className="space-y-1">
          <li className="flex items-center gap-2">
            <span className="text-green-500">•</span>
            <span>Supported formats: JPG, PNG, GIF, WebP</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">•</span>
            <span>Maximum file size: 5MB</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">•</span>
            <span>Recommended: Square images (1:1 ratio) for best display</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
