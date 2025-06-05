// import React from "react";

// type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

// interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
//     variant?: BadgeVariant;
// }

// const variantClasses: Record<BadgeVariant, string> = {
//     default: "bg-blue-600 text-white border-transparent hover:bg-blue-700",
//     secondary: "bg-gray-300 text-gray-900 border-transparent hover:bg-gray-400",
//     destructive: "bg-red-600 text-white border-transparent hover:bg-red-700",
//     outline: "border border-gray-400 bg-white text-gray-900 hover:bg-gray-100",
// };

// export const Badge: React.FC<BadgeProps> = ({
//     variant = "default",
//     className = "",
//     children,
//     ...props
// }) => {
//     const baseClasses =
//         "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

//     const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

//     return (
//         <div className= { combinedClasses }  {...props }>
//             { children }
//             </div>
//   );
// };
