// 'use client';
// import { useEffect } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import useGoogleLoginHook from '@/hooks/GoogleLogin.hook';
// import useHomeStore from '@/store/Employee/home.store';

// export default function GoogleCallbackPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const code = searchParams.get('code');
//   const jobId = useHomeStore((state) => state.jobId);
//   const GoogleLoginMutation = useGoogleLoginHook();

//   useEffect(() => {
//     if (code) {
//       GoogleLoginMutation.mutate(code, {
//         onSuccess: () => {
//           if (jobId) {
//             router.push(`/review/${jobId}`);
//           } else {
//             router.push('/signup');
//           }
//         },
//         onError: () => {
//           router.push('/login');
//         },
//       });
//     }
//   }, [code]);

//   return <div className="text-center mt-20">Processing Google Login...</div>;
// }
