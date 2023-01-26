import React from 'react';

interface bringDataProps {
    username: string
}

interface Response {
    followMe: string
}

const bringData = (props: bringDataProps): Response  => {


    const username = props.username;

    /**
     * Initialized like this so typescript can infer the type
     */
    let followers = [{ username: "", full_name: "" }];
    let followings = [{ username: "", full_name: "" }];
    let dontFollowMeBack = [{ username: "", full_name: "" }];
    let iDontFollowBack = [{ username: "", full_name: "" }];

    followers = [];
    followings = [];
    dontFollowMeBack = [];
    iDontFollowBack = [];

    (async () => {
    try {
        console.log(`Process started! Give it a couple of seconds`);

        let headers = new Headers();

        headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
        headers.append('Access-Control-Allow-Credentials', 'true');
        const userQueryRes = await fetch(
        `https://www.instagram.com/web/search/topsearch/?query=${username}`, {
            headers: headers
        }
        );

        const userQueryJson = await userQueryRes.json();

        const userId = userQueryJson.users[0].user.pk;

        let after = null;
        let has_next = true;

        while (has_next) {
            await fetch(
                `https://www.instagram.com/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables=` +
                encodeURIComponent(
                    JSON.stringify({
                    id: userId,
                    include_reel: true,
                    fetch_mutual: true,
                    first: 50,
                    after: after,
                    })
                ), 
                {
                    headers: headers
                }
            )
            .then((res) => res.json())
            .then((res) => {
            has_next = res.data.user.edge_followed_by.page_info.has_next_page;
            after = res.data.user.edge_followed_by.page_info.end_cursor;
            followers = followers.concat(
                res.data.user.edge_followed_by.edges.map(({ node }: {node:any}) => {
                console.log("m__",node);
                return {
                    username: node.username,
                    full_name: node.full_name,
                };
                })
            );
            });
        }

        console.log({ followers });

        after = null;
        has_next = true;

        while (has_next) {
        await fetch(
            `https://www.instagram.com/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables=` +
            encodeURIComponent(
                JSON.stringify({
                id: userId,
                include_reel: true,
                fetch_mutual: true,
                first: 50,
                after: after,
                })
            ), 
            {
                headers: headers
            }
        )
            .then((res) => res.json())
            .then((res) => {
            has_next = res.data.user.edge_follow.page_info.has_next_page;
            after = res.data.user.edge_follow.page_info.end_cursor;
            followings = followings.concat(
                res.data.user.edge_follow.edges.map(({ node }: {node:any}) => {
                return {
                    username: node.username,
                    full_name: node.full_name,
                };
                })
            );
            });
        }

        console.log({ followings });

        dontFollowMeBack = followings.filter((following) => {
        return !followers.find(
            (follower) => follower.username === following.username
        );
        });

        console.log({ dontFollowMeBack });

        iDontFollowBack = followers.filter((follower) => {
        return !followings.find(
            (following) => following.username === follower.username
        );
        });

        console.log({ iDontFollowBack });

        console.log(
        `Process is done: Type 'copy(followers)' or 'copy(followings)' or 'copy(dontFollowBack)' in the console and paste it into a text editor to take a look at it'`
        );
    } catch (err) {
        console.log({ err });
    }
    })();


    return {
        followMe: "marios__"+props.username
    };
};

export default bringData;


/*
(async () => {
    try {
        console.log(`Process started! Give it a couple of seconds`);

        let headers = new Headers();

        headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
        headers.append('Access-Control-Allow-Credentials', 'true');
        const userQueryRes = await fetch(
        `https://www.instagram.com/web/search/topsearch/?query=${username}`, {
            headers: headers
        }
        );

        const userQueryJson = await userQueryRes.json();

        const userId = userQueryJson.users[0].user.pk;

        let after = null;
        let has_next = true;

        while (has_next) {
            await fetch(
                `https://www.instagram.com/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables=` +
                encodeURIComponent(
                    JSON.stringify({
                    id: userId,
                    include_reel: true,
                    fetch_mutual: true,
                    first: 50,
                    after: after,
                    })
                ), 
                {
                    headers: headers
                }
            )
            .then((res) => res.json())
            .then((res) => {
            has_next = res.data.user.edge_followed_by.page_info.has_next_page;
            after = res.data.user.edge_followed_by.page_info.end_cursor;
            followers = followers.concat(
                res.data.user.edge_followed_by.edges.map(({ node }: {node:any}) => {
                console.log("m__",node);
                return {
                    username: node.username,
                    full_name: node.full_name,
                };
                })
            );
            });
        }

        console.log({ followers });

        after = null;
        has_next = true;

        while (has_next) {
        await fetch(
            `https://www.instagram.com/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables=` +
            encodeURIComponent(
                JSON.stringify({
                id: userId,
                include_reel: true,
                fetch_mutual: true,
                first: 50,
                after: after,
                })
            ), 
            {
                headers: headers
            }
        )
            .then((res) => res.json())
            .then((res) => {
            has_next = res.data.user.edge_follow.page_info.has_next_page;
            after = res.data.user.edge_follow.page_info.end_cursor;
            followings = followings.concat(
                res.data.user.edge_follow.edges.map(({ node }: {node:any}) => {
                return {
                    username: node.username,
                    full_name: node.full_name,
                };
                })
            );
            });
        }

        console.log({ followings });

        dontFollowMeBack = followings.filter((following) => {
        return !followers.find(
            (follower) => follower.username === following.username
        );
        });

        console.log({ dontFollowMeBack });

        iDontFollowBack = followers.filter((follower) => {
        return !followings.find(
            (following) => following.username === follower.username
        );
        });

        console.log({ iDontFollowBack });

        console.log(
        `Process is done: Type 'copy(followers)' or 'copy(followings)' or 'copy(dontFollowBack)' in the console and paste it into a text editor to take a look at it'`
        );
    } catch (err) {
        console.log({ err });
    }
    })();
*/