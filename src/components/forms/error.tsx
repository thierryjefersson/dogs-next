export default function Error({ text }: { text: string }) {
  return <small className="my-1 block text-sm text-[#f31]">{text}</small>;
}
