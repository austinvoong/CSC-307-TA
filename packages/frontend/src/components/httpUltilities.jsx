const API_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8001'
  : 'https://taskarena-hxd7fcczhcdgfnch.westus3-01.azurewebsites.net';

function FetchPostUser(account) {
    const promise = fetch(
        '${API_URL}/adduser/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(account),
        }
    )
    //console.log(`function postUser(account) account = ${JSON.stringify(account)}`);
    //console.log(`postUser: ${account}`)
    return promise
}

function FetchFindUserName(username) {
    const promise = fetch(
        `${API_URL}/findusername?username=${username}`
    )
    return promise
}
function FindAccount(username, password) {
    //console.log(username, password);
    const promise = fetch(
        `${API_URL}/findaccount?username=${username}&password=${password}`
    )
    return promise
}

async function FetchUserStats(username) {
    try{
        const response = await fetch('${API_URL}/user/${username}/stats');
        if (!response.ok) {
            throw new Error('Failed to fetch user stats');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user stats:', error);
        throw error; 
    }
}

async function UpdateUserStats(username, stats) {
    try {
        const response = await fetch(`${API_URL}/user/${username}/stats`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(stats)
        });
        if (!response.ok) {
            throw new Error('Failed to update user stats');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating user stats:', error);
        throw error;
    }
}

export { FetchFindUserName, FetchPostUser, FindAccount, FetchUserStats, UpdateUserStats }
