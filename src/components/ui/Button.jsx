
const Button = ({ type, name, width, height = 'h-12', ...props}) => {
    return (
        <button type={type} 
                className={`login-btn ${width ? width : 'w-60 md:w-80'} ${height} max-w-md flex justify-center items-center rounded-lg bg-gray-100 text-black font-semibold cursor-pointer lg:bg-gray-200 lg:hover:bg-gray-50 focus:outline-2 focus:outline-blue-600 transition-colors duration-300`}
                {...props}>
            {name}
        </button>
    )
}

export default Button