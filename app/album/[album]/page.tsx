import { connectDB } from "@/util/database";
import Album from "../../components/Album";

export default async function AlbumPage(props :any){

    // params 한글로 디코딩
    let decodedParams = decodeURIComponent(props.params.album);
    // 공백 제거
    decodedParams = decodedParams.replaceAll(" ", "");

    // DB에 앨범명 쫙 저장해놓고, 불러와서 비교하기. 
    // 유사어가 있으면 그걸로 음원 검색하기
    let db = (await connectDB).db('maple-bgm');
    let res =  await db.collection('album').find().toArray();

    let albums = (res[0].album);
    let isFound = false;

    albums.map((a :string) => {

        if(a.includes(decodedParams) && a !== decodedParams){
            // 유사어거나 같으면 해당 어레이의 앨범명 재할당
            decodedParams = a
            // a와 검색어가 일치하면 isFound 변수에는 변화 x
            isFound = true;
        }
    })

    return(
        <div>
            {
                isFound?
                <p>이걸 찾으셨나요? &nbsp; 
                    <span style={{textDecorationLine:'underline', color:'blue'}}>{decodedParams}</span>
                </p> :null
            }
            <Album decodedParams = {decodedParams}/>
        </div>
    )
}