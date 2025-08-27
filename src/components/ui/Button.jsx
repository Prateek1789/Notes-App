
const Button = ({ type, name, width, height = 'h-12', ...props}) => {
    return (
        <button type={type} 
                className={`login-btn ${width ? width : 'w-60 md:w-80'} ${height} focus:outline-2 focus:outline-blue-600`}
                {...props}>
            {name}
        </button>
    )
}

export default Button