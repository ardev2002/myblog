export default function getAbsoluteS3Url(path: string) {
    const bucketName = process.env.NEXT_PUBLIC_BUCKET_NAME!;
    const region = process.env.NEXT_PUBLIC_REGION!;
    return `https://${bucketName}.s3.${region}.amazonaws.com/${path}`;
}