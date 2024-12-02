export default function Error({message}:{message:string}) {
  return (
    <div className="bg-red-100  text-sm p-2 mt-2 rounded-md text-red-500 transition-all">{message}</div>
  )
}
