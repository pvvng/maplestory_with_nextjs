import { connectDB } from "@/util/database";
import Album from "../../components/play/Album";
import { findSimilarWord } from "@/app/funcions/checkLevenshtein";
import getDBuserdata from "@/app/funcions/fetch/getDBuserdata";

export default async function AlbumPage(props :any){

    const { session, isExist, userdata } = await getDBuserdata();

    // params 한글로 디코딩
    let decodedParams = decodeURIComponent(props.params.album);
    // 최초 params save
    let storedParams = decodedParams

    // 공백 제거
    decodedParams = decodedParams.replaceAll(" ", "");

    // db에서 유사어 발견시 true로 변함
    let isFound = false;
    // 검색어가 db에 저장된 값과 완전히 일치하는지 확인하는 변수
    let urlOk = false;

    // DB에 앨범명 쫙 저장해놓고, 불러와서 비교하기. 
    // 유사어가 있으면 그걸로 음원 검색하기
    let db = (await connectDB).db('maple-bgm');
    let res =  await db.collection('album').find().toArray();
    let albums = (res[0].album);

    albums.map((a :string) => {

        // db에 저장된 값과 최초 url이 완벽하게 일치할 때
        if (storedParams === a){
            urlOk = true;
        }

        // db에 저장된 앨범 명 공백 제거
        let fixedName = a.replaceAll(" ","")

        // 소문자 m 들어오면 처리
        if(decodedParams.includes('m')){
            decodedParams = decodedParams.toUpperCase();
        }

        // 리프레 들어오면 처리
        if('리프레'.includes(decodedParams) || decodedParams.includes('리프레')){
            decodedParams = '미나르 숲';
            isFound = true;
        }
 
        if (((fixedName.includes(decodedParams) || decodedParams.includes(fixedName)) && fixedName !== decodedParams) || fixedName === decodedParams) {
            // 유사어거나 같으면 해당 어레이의 앨범명 재할당
            decodedParams = a;
            // a와 검색어가 일치하면 isFound 변수에는 변화 x
            isFound = true;
        }
    })

    if(!isFound){
        // 임계치로 유사어 검색하기
        decodedParams = (findSimilarWord(decodedParams,albums))
        isFound = true
    }

    if (decodedParams === ""){
        // 유사어를 아예 찾지 못했을 때 (findSimilarWord에서 ''이 반환될 때)
        decodedParams = "메이플스토리 M"
        isFound = false
    }

    // 로그인 x시 예외처리
    if(!session) return <h1 style={{textAlign:'center'}}>로그인 후 이용 가능한 페이지입니다.</h1>       
    
    return(
        <div>
            {
                urlOk?
                null:
                isFound?
                <p>이걸 찾으셨나요? &nbsp; 
                    <span style={{textDecorationLine:'underline', color:'blue'}}>{decodedParams}</span>
                </p> :
                <div>
                    <p>검색 결과가 없습니다.</p>
                    <p>이 앨범은 어떠세요?</p>
                </div>
            }
            <Album decodedParams = {decodedParams} userdata={userdata} />
        </div>
    )
}