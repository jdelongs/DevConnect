import React, { Fragment } from 'react'; 

const NotFound404 = () => {
    return (
        <Fragment>
            <h1 className="x-large text-primary">
                <i className="fas fa-exclamation-triangle"></i> Page Note Found            
            </h1>
            <p className="large">Sorry, this page does not exist</p>
        </Fragment>
    )
}

export default NotFound404