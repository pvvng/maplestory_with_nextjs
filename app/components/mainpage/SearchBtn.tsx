import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRef } from "react";

interface PropsType {
  router :AppRouterInstance
}

export default function SearchBtn({router} :PropsType){
    // input 참조
    const inputRef = useRef<HTMLInputElement>(null);
    // input value 저장하기
    const valueRef = useRef<string>('');
    
    // input vlaue를 valueRef에 저장
    const saveValue = () => {
      if (inputRef.current) {
        valueRef.current = inputRef.current.value;
      }
    };

  return(
    <div>
      <input ref={inputRef} type="text" placeholder="앨범 검색" />
        <button onClick={()=> {
          // 검색어 저장 함수
          saveValue();
      
          if(valueRef.current !== ''){
            // 페이지 라우팅
            router.push('/album/' + valueRef.current);
          }else{
            // 예외처리
            alert('검색어를 입력하세요.');
          }
      
      }}>검색</button>
    </div>
  )

}