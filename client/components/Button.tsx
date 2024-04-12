type ButtonProps = {
    children: React.ReactNode;
    className: string;
    onClick?: () => void;
}

const Button = ({ children, className, onClick }: ButtonProps) => {
    return (
        <button
            className={`inline-flex whitespace-nowrap items-center justify-center px-4 py-2 border border-[#27272a] font-medium text-sm rounded-md transition-colors cursor-pointer ${className}`}
            // CHECK: Something can be changed here
            onClick={onClick ? onClick : () => console.log()}
        >
            {children}
        </button>
    )
}

export default Button;
