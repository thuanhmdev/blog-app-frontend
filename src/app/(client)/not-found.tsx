import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <div className="text-center py-24">
        <h1 className="text-xl font-bold">Không tìm thấy – 404!</h1>
        <div className="mt-2">
          <Link className="text-blue-500" href="/">
            Về lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
