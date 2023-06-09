const React = require('react')

function Index(props) {
    return (
        <div>
            <h1>User page</h1>
            <ul>
                {
                    props.users.map((user) => {
                        return (
                            <li key={user._id}>
                                <a href={`/users/${user._id}`}>{user.
                                    name} has an email: {user.email}
                                    and their hashed password is {user.password}</a>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

module.exports = Index