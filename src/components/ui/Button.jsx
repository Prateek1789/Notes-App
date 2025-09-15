
const Button = ({ type='button', name, width, height='h-12', dark=false, ...props }) => {
    return (
        <button type={type} 
                className={`login-btn ${width ? width : 'w-60 md:w-80'} ${height} max-w-md flex justify-center items-center rounded-lg ${dark ? 'bg-neutral-900 hover:bg-neutral-800 text-gray-100 border-neutral-800' : 'bg-white lg:bg-white lg:hover:bg-gray-50 text-black border-border-line'} border font-semibold cursor-pointer focus:outline-2 focus:outline-blue-600 transition-colors duration-300 disabled:bg-SBL-text disabled:hover:bg-SBL-text`}
                {...props}>
            {name}
        </button>
    )
}

export default Button