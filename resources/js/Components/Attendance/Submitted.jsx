export default function submitted(){
    const hariIni = new Date();
    const tanggal = hariIni.toLocaleDateString('id-ID');
    return <h1 className="font-bold">Anda sudah absen hari ini {tanggal} </h1>
}