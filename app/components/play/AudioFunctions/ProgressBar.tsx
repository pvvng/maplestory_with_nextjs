import styled from "styled-components"

let ProgressBarOuter = styled.div`
    width : 100%;
    height : 10px;
    background : #eee;
    margin:auto;
    border-radius : 10px;
`

let ProgressBarInner = styled.div<{remainDuration :number}>`
    width : ${props => props.remainDuration}%;
    height : 100%;
    background :black;
    border-radius : 10px;
`

interface ProgressBarType{
    [key:string]:number
}

export default function ProgressBar({duration, storedDuration, remainDuration} :ProgressBarType){
    return(
        <div style={{textAlign:'left'}}>
            {
                duration > 0?
                <div>
                    {/* 현재 재생중인 음원 길이 (num) */}
                    <div className='row'>
                        <span className='col-6'>{duration.toFixed(0)}</span>
                        <span className='col-6'  style={{textAlign:'right'}}>{storedDuration.toFixed(0)}</span>
                    </div>
                    {/* progress bar */}
                    <ProgressBarOuter>
                        <ProgressBarInner remainDuration={remainDuration}></ProgressBarInner>
                    </ProgressBarOuter>
                </div>
                :
                <div className="spinner-border mt-3" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            }
        </div>
    )
}