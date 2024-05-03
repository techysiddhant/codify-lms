// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";
// import { CustomUser } from "./app/api/auth/[...nextauth]/route";
// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   if (pathname == "/") {
//     return NextResponse.next();
//   }
//   const token = await getToken({ req: request });
//   console.log("TOKEN :", token);
//   // * Protected routes for user
//   const userProtectedRoutes = ["/dashboard"];

//   // * Protected routes for admin
//   const adminProtectedRoutes = ["/admin/:path*"];
//   //protected routes for creator
//   const creatorProtectedRoutes = ["/creator/:path*"];

//   if (
//     token == null &&
//     (userProtectedRoutes.includes(pathname) ||
//       adminProtectedRoutes.includes(pathname))
//   ) {
//     return NextResponse.redirect(
//       new URL("/?error=Please login first to access this route", request.url)
//     );
//   }

//   const user: CustomUser | null = token?.user as CustomUser;
//   console.log("USER :", user);
//   if (user && token) {
//     if (
//       adminProtectedRoutes.includes(pathname) && (user.role == "USER" ||
//       user.role == "CREATOR")
//     ) {
//       return NextResponse.redirect(
//         new URL("/?error=Please login first to access this route.", request.url)
//       );
//     }else if(creatorProtectedRoutes.includes(pathname) && user.role == "USER"){
//       return NextResponse.redirect(
//         new URL("/?error=Please login first to access this route.", request.url)
//       );
//     }else{
//       return NextResponse.next();
//     }
//   }else{
//     return NextResponse.redirect(
//       new URL("/", request.url)
//     );
//   }
//   // * if user try to access admin routes
//   //  if (token !=null && adminProtectedRoutes.includes(pathname) && user.role == "USER" || user.role == "CREATOR") {
//   //   return NextResponse.redirect(
//   //     new URL(
//   //       "/?error=Please login first to access this route.",
//   //       request.url
//   //     )
//   //   );
//   // }

//   // if (token !=null && userProtectedRoutes.includes(pathname) && user.role == "ADMIN"  ) {
//   //   return NextResponse.redirect(
//   //     new URL(
//   //       "/?error=Please login first to access this route.",
//   //       request.url
//   //     )
//   //   );
//   // }

//   // if (token !=null && creatorProtectedRoutes.includes(pathname) && user.role == "USER") {
//   //   return NextResponse.redirect(
//   //     new URL(
//   //       "/?error=Please login first to access this route.",
//   //       request.url
//   //     )
//   //   );
//   // }
// }

// import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";
// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(request: NextRequestWithAuth) {
//     // console.log(request.nextUrl.pathname)
//     console.log("MID",request)

//     if (
//       request.nextUrl.pathname.startsWith("/admin") &&
//       request.nextauth.token?.role !== "ADMIN"
//     ) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }

//     if (
//       request.nextUrl.pathname.startsWith("/creator") &&
//       request.nextauth.token?.role !== "ADMIN" &&
//       request.nextauth.token?.role !== "CREATOR"
//     ) {
//       return NextResponse.rewrite(new URL("/", request.url));
//     }
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token,
//     },
//   }
// );

// // Applies next-auth only to matching routes - can be regex
// // Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// export const config = { matcher: ["/admin", "/creator"] };
// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { CustomUser } from "./app/api/auth/[...nextauth]/route";

// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
// 	const { pathname } = request.nextUrl;
// 	// if (pathname == "/") {
// 	//   return NextResponse.next();
// 	// }
// 	const token = await getToken({ req: request });
// 	const user: CustomUser | null = token?.user as CustomUser;
// 	const isPublicPath = pathname === "/";
// 	// console.log("TOKEN :", token);
// 	// console.log("USER :", user);
// 	// console.log(request.url);
// 	// if(user){
// 	//   return NextResponse.redirect(new URL("/creator/create", request.url));
// 	// }
// 	const adminProtectedRoutes = ["/admin"];
// 	const userProtectedRoutes = ["/courses"];
// 	// if (!token) {
// 	// 	return NextResponse.redirect(new URL("/", request.url));
// 	// 	// return NextResponse.next();
// 	// }
// 	if (token) {
// 		if (
// 			adminProtectedRoutes.includes(pathname) &&
// 			(user.role === "USER" || user.role === "CREATOR")
// 		) {
// 			return NextResponse.redirect(new URL("/", request.url));
// 		}
// 		if (pathname.startsWith("/courses") && user.role === "CREATOR") {
// 			return NextResponse.redirect(new URL("/", request.url));
// 		}
// 		if (pathname.startsWith("/creator") && user.role === "USER") {
// 			return NextResponse.redirect(new URL("/", request.url));
// 		}
// 	} else {
// 		console.log("TOKEN-1", token);
// 		if (
// 			pathname.startsWith("/courses") ||
// 			pathname.startsWith("/admin") ||
// 			pathname.startsWith("/creator")
// 		) {
// 			return NextResponse.redirect(new URL("/", request.url));
// 		}
// 	}
// }

// // See "Matching Paths" below to learn more
// export const config = {
// 	matcher: [
// 		"/creator/:path*",
// 		"/admin/:path*",
// 		"/courses/:path*",
// 		"/api/categories",
// 		"/",
// 		/*
// 		 * Match all request paths except for the ones starting with:
// 		 * - api (API routes)
// 		 * - _next/static (static files)
// 		 * - _next/image (image optimization files)
// 		 * - favicon.ico (favicon file)
// 		 */
// 		// "/((?!api|_next/static|_next/image|favicon.ico).*)",
// 	],
// };
import { withAuth } from "next-auth/middleware";
import { CustomUser } from "./app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export default withAuth(
	// `withAuth` augments your `Request` with the user's token.

	function middleware(req) {
		// console.log("TOKEN :", req.nextauth.token);
		const { pathname } = req.nextUrl;
		// console.log("PATHNAME :", pathname);
		const token = req.nextauth.token;
		// console.log("TOKEN :", token);
		const user: CustomUser | null = token?.user as CustomUser;
		// console.log("USER :", user);
		if (pathname.startsWith("/creator") && user.role === "USER") {
			// console.log("USER :", user);
			return NextResponse.redirect(new URL("/", req.url));
		}
		if (
			pathname.startsWith("/admin") &&
			(user.role === "USER" || user.role === "CREATOR")
		) {
			return NextResponse.redirect(new URL("/", req.url));
		}
		if (
			pathname.startsWith("/dashboard") &&
			(user.role === "USER" || user.role === "CREATOR")
		) {
			// return NextResponse.redirect(new URL("/", req.url));
			return NextResponse.next();

		}
		
	},

	{
		callbacks: {
			authorized: ({ token }) => {
				if (token) {
					return true;
				}
				return false;
			},
		},
		pages: {
			signIn: "/",
			error: "/auth/signin",
		},
	}
);

export const config = {
	matcher: [
		// "/api/:path*",
		"/creator/:path*",
		"/admin/:path*",
		"/courses/:path*",
		"/dashboard/:path*",
		"/onboarding/:path*",
		"/",
		// "/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
};
