import { FileUploader } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';

export const UploadImage = () => {
  return (
    <FileUploader
      acceptedFileTypes={['image/*']}
      path="public/blog-images/"
      maxFileCount={1}
      isResumable
      onUploadSuccess={() => alert('Image uploaded successfully')}
    />
  );
};
