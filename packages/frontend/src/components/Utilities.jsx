import { FetchFindUserName, FindAccount, FetchUserStats  } from './httpUltilities'

function Is_User_Name_Exist(uname) {
    return FetchFindUserName(uname)
        .then((res) => {
            if (!res.ok) {
                throw new Error('checking User Name error')
            }
            return res.json()
        })
        .then((data) => {
            //console.log(data, data.exits);
            return data.exits
        })
        .catch((error) => {
            console.log(error)
        })
}
async function MatchAccount(account) {
    try {
        const response = await FindAccount(account.username, account.password);
        if (response.status === 404) {
            return { status: 404, message: 'Account not found' };
        }
        
        // Fetch user stats after successful login
        const userStats = await FetchUserStats(account.username);
        return {
            status: 201,
            data: {
                username: account.username,
                stats: userStats
            }
        };
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

export { Is_User_Name_Exist, MatchAccount }
