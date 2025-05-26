// interface Response {
//   text: string;
//   type: string;
// }

// export default interface QuestionProps {
//   questions: Response[];
//   showImage?: boolean;
// }

export default interface QuestionType {
  text: string;
  type: string;
  questions?: string[];
}
