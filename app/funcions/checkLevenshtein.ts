// 임계값으로 유사어 찾는 함수
const levenshtein = require('fast-levenshtein');

// 유사도 임계값 설정
const SIMILARITY_THRESHOLD = 5;

// 입력된 단어와 유사한 단어를 찾는 함수
export function findSimilarWord(input :string, dictionary :string[]) :string {
    let minDistance = Infinity;
    let similarWord:string = ""

    dictionary.forEach(word => {
        const distance = levenshtein.get(input, word);
        if (distance < minDistance && distance <= SIMILARITY_THRESHOLD) {
            minDistance = distance;
            similarWord = word;
        }
    });

    return similarWord;
}