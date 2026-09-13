import { useRef, useState } from 'react'
import { uploadFile } from '../lib/api.js'

const BUCKET = 'candidate-documents'
const PATH = 'portal/profile'

function fileNameFromUrl(url) {
  return url.split('/').pop() || 'Uploaded file'
}

function UrlFileUpload({
  label,
  accept,
  value,
  onUpload,
  onRemove,
  disabled = false,
  maxSize = 25,
  hint,
}) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(file) {
    if (!file) return
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File exceeds ${maxSize}MB limit`)
      return
    }
    setError('')
    setUploading(true)
    try {
      const url = await uploadFile({ file, bucket: BUCKET, path: PATH })
      onUpload(url)
    } catch (err) {
      setError(err.message || 'Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
        {label}
      </label>
      <div className="border-2 border-dashed border-outline-variant rounded-lg p-4 text-center transition-colors hover:border-primary/50 hover:bg-surface-container-low">
        {value ? (
          <div className="flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-primary">description</span>
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body-sm text-sm text-primary truncate max-w-[180px] hover:underline"
            >
              {fileNameFromUrl(value)}
            </a>
            {!disabled && (
              <>
                <button
                  type="button"
                  disabled={uploading}
                  onClick={() => inputRef.current?.click()}
                  className="flex items-center gap-1 font-label-sm text-label-sm text-secondary hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">swap_horiz</span>
                  Replace
                </button>
                <button
                  type="button"
                  disabled={uploading}
                  onClick={onRemove}
                  className="text-secondary hover:text-error transition-colors"
                  aria-label={`Remove ${label}`}
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </>
            )}
          </div>
        ) : uploading ? (
          <div className="flex items-center justify-center gap-2 text-secondary">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="font-body-sm text-body-sm">Uploading...</span>
          </div>
        ) : (
          <button
            type="button"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
            className="w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-secondary text-2xl">cloud_upload</span>
            <p className="font-body-sm text-secondary mt-1">
              {disabled ? 'No file uploaded' : 'Click to upload'}
            </p>
            {hint && <p className="font-body-xs text-secondary/70 mt-0.5">{hint}</p>}
          </button>
        )}
      </div>
      {error && <p className="font-body-xs text-xs text-error mt-1">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0] || null)
          e.target.value = ''
        }}
      />
    </div>
  )
}

function MultiUrlFileUpload({
  label,
  accept,
  values,
  onUpload,
  disabled = false,
  maxSize = 25,
  maxFiles = 10,
}) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const list = Array.isArray(values) ? values : []

  async function handleFile(file) {
    if (!file) return
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File exceeds ${maxSize}MB limit`)
      return
    }
    setError('')
    setUploading(true)
    try {
      const url = await uploadFile({ file, bucket: BUCKET, path: PATH })
      onUpload([...list, url])
    } catch (err) {
      setError(err.message || 'Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  function remove(index) {
    onUpload(list.filter((_, i) => i !== index))
  }

  return (
    <div>
      <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
        {label}
      </label>
      <div className="space-y-2">
        {list.map((url, i) => (
          <div
            key={`${url}-${i}`}
            className="flex items-center gap-2 border border-outline-variant rounded-lg px-3 py-2 bg-surface-container-low"
          >
            <span className="material-symbols-outlined text-secondary text-lg">description</span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body-sm text-sm text-primary truncate hover:underline flex-grow"
            >
              {fileNameFromUrl(url)}
            </a>
            {!disabled && (
              <button
                type="button"
                onClick={() => remove(i)}
                className="text-secondary hover:text-error transition-colors"
                aria-label={`Remove document ${i + 1}`}
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          disabled={disabled || uploading || list.length >= maxFiles}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
          className="flex w-full items-center justify-center gap-1 border-2 border-dashed border-outline-variant rounded-lg p-3 font-label-sm text-label-sm text-primary hover:bg-surface-container-low transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
          ) : (
            <span className="material-symbols-outlined text-sm">add</span>
          )}
          {uploading ? 'Uploading...' : list.length >= maxFiles ? 'Maximum documents reached' : 'Add another document'}
        </button>
        {error && <p className="font-body-xs text-xs text-error">{error}</p>}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0] || null)
          e.target.value = ''
        }}
      />
    </div>
  )
}

export { UrlFileUpload, MultiUrlFileUpload }