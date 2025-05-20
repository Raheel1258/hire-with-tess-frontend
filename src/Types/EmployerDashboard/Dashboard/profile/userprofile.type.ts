export interface AnswerType {
  type: 'audio' | 'video' | 'screen';
  url: string;
  temp_url?: string;
}

export interface UserProfileData {
  id: string;
  candidate_name: string;
  image_url?: string;
  status: string;
  ai_score: number;
  job_title: string;
  created_at: string;
  answers: Record<string, AnswerType>;
}

export interface UserProfileProps {
  data: UserProfileData;
}