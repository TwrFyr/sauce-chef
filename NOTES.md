- necessary for login are cookies:
- logout:
```
Request URL: https://capi-v2.sankakucomplex.com/auth/logout?lang=en
Request Method: POST
Status Code: 200 
```
- login:
```
Request URL: https://login.sankakucomplex.com/auth/token
Request Method: POST
Status Code: 200 
Payload:
{"login":"<username>","password":"<password>"}
```
returns:
```json
{
    "success": true,
    "token_type": "Bearer",
    "access_token": "xxx",
    "refresh_token": "xxx",
    "current_user": {
        "id": 1,
        "name": "",
        "level": 20,
        "created_at": "2021-05-25 13:15",
        "favs_are_private": true,
        "avatar_url": "",
        "avatar_rating": "q",
        "post_upload_count": 0,
        "pool_upload_count": 0,
        "comment_count": 0,
        "post_update_count": 0,
        "note_update_count": 0,
        "wiki_update_count": 0,
        "forum_post_count": 0,
        "pool_update_count": 0,
        "artist_update_count": 0,
        "last_logged_in_at": "2021-05-30 08:48",
        "email_verification_status": "verified",
        "is_verified": true,
        "email": "xxx",
        "hide_ads": false,
        "subscription_level": 0,
        "filter_content": false,
        "receive_dmails": false
    }
}
```

