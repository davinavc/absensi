import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    return (
        <div className="flex gap-1 mt-4">
            {links.map((link, index) => (
                link.url ? (
                    /* JIKA URL ADA (Aman, jalankan persis seperti tutorial) */
                    <Link
                        key={index}
                        href={link.url}
                        className={
                            link.active 
                                ? "bg-indigo-600 text-white px-4 py-2 border border-indigo-600 rounded-md"
                                : "text-indigo-600 hover:bg-indigo-600 hover:text-white px-4 py-2 border rounded-md"
                        }
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ) : (
                    /* JIKA URL NULL (Pengaman untuk tombol Previous/Next mati) */
                    <span
                        key={index}
                        className="text-gray-400 px-4 py-2 border rounded-md cursor-not-allowed bg-gray-50"
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                )
            ))}
        </div>
    );
}