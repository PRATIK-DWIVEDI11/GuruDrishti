import { Link } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";

// const LoginPage = () => {
// 	return (
// 		<div className='min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
// 			<div className='sm:mx-auto sm:w-full sm:max-w-md'>
// 				<img className='mx-auto h-40 w-auto' src='/logo.svg' alt='GuruDrishti' />
// 				<h2 className=' text-center text-3xl font-extrabold text-gray-900'>Sign in to your account</h2>
// 			</div>

// 			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md shadow-md'>
// 				<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
// 					<LoginForm />
// 					<div className='mt-6'>
// 						<div className='relative'>
// 							<div className='absolute inset-0 flex items-center'>
// 								<div className='w-full border-t border-gray-300'></div>
// 							</div>
// 							<div className='relative flex justify-center text-sm'>
// 								<span className='px-2 bg-white text-gray-500'>New to GuruDrishti?</span>
// 							</div>
// 						</div>
// 						<div className='mt-6'>
// 							<Link
// 								to='/signup'
// 								className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-gray-50'
// 							>
// 								Join now
// 							</Link>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
// export default LoginPage;



const LoginPage = () => {
	return (
		<div 
			className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative" 
		>
			{/* Background Overlay */}
			<div 
				className="absolute inset-0 bg-repeat opacity-20" 
				style={{ 
					backgroundImage: "url('/logo.svg')",
					backgroundSize: "150px 150px", 
					// transform: "rotate(45deg)"
				}}
			></div>

			{/* Content */}
			<div className='relative sm:mx-auto sm:w-full sm:max-w-md'>
				<img className='mx-auto h-20 w-auto' src='/D.svg' alt='GuruDrishti' />
				<h2 className='text-center text-3xl font-extrabold text-gray-900'>
					Sign in to your account
				</h2>
			</div>

			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md shadow-md relative z-10'>
				<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
					<LoginForm />
					<div className='mt-6'>
						<div className='relative'>
							<div className='absolute inset-0 flex items-center'>
								<div className='w-full border-t border-gray-300'></div>
							</div>
							<div className='relative flex justify-center text-sm'>
								<span className='px-2 bg-white text-gray-500'>New to GuruDrishti?</span>
							</div>
						</div>
						<div className='mt-6'>
							<Link
								to='/signup'
								className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-gray-50'
							>
								Join now
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;

