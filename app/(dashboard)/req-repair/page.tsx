import Nav from "../../components/nav"
export default function reqRepair() {
    return (

        <form action="#" className="bg-white">
            <div>
                <h1 className="text-4xl p-4">
                    ยื่นเรื่องแจ้งซ่อม
                </h1>
            </div>
            <div className="p-4">
                <span>หัวข้อเรื่อง </span>
                <input type="text" name="tile" placeholder="หัวข้อเรื่อง..." className="border rounded-md ml-10 bg-white text-xl" />

                <div>
                    ข้อมูลผู้จ้าง
                </div>
                <div>
                    ชื่อ
                </div>
                <div>
                    นามสกุล
                </div>
                <div>
                    Email
                </div>
                <div>
                    Line สำหรับติดต่อกลับ
                </div>
                <div>
                    รายละเอียด
                </div>


            </div>

        </form>



    )
}