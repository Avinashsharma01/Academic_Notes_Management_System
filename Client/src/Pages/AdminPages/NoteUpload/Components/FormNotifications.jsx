/* eslint-disable react/prop-types */

const FormNotifications = ({ message, errors }) => {
    return (
        <>
            {message && (
                <div className="bg-green-900/40 border-l-4 border-green-500 text-green-100 p-4 rounded-md mb-6">
                    <p>{message}</p>
                </div>
            )}

            {errors && (
                <div className="bg-red-900/40 border-l-4 border-red-500 text-red-100 p-4 rounded-md mb-6">
                    <p>{errors}</p>
                </div>
            )}
        </>
    );
};

export default FormNotifications;
