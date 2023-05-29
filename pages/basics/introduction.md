# An introduction to InnerTube

**InnerTube**, also known as **YouTubeI** due to the codename in its URLs, is the YouTube's internal API, used for the desktop website, 
the mobile apps, pretty much any official YouTube client you can think of. It is much more capable than the public Data API in
many regards. Since the official clients build their pages client-side, the requests to the API are exposed, and as such, we can 
study the API and use it to our advantage.

## The basics

There are many instances of InnerTube, on different YouTube servers. It is not known what the difference between them is. The main 
instance is at `https://www.youtube.com/youtubei/v1/`. There are more versions of InnerTube than v1, but not much is known about them 
at all.

A basic URL to an InnerTube request has the following structure:

```
https://www.youtube.com/youtubei/v1/<endpoint>?key=<key>
```
    
The key for the desktop client is `AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8`. There are keys for other clients, but it is not known if 
there are any permission differences between them, so just stick to the desktop key.
    
## The request body

Every InnerTube request is done with the `POST` method, with a body in JSON format (`Content-Type: application/json`).
    
Here is the most basic InnerTube request body:
    
```
{
    "context": {
        "client": {
            "clientName": "WEB",
            "clientVersion": "2.20230301.00.00",
            "hl": "en",
            "gl": "US"
        }
    }
}
```
    
Here is a rundown of what each thing is.

<ul>
    <li><code>context</code> contains basic information about the client and user that stays the same for any request.</li>
    <li><code>client</code> contains basic information about the client, such as the language, country, and information about the device (absent here).</li>
    <li><code>clientName</code> is the name of the client that InnerTube should give data for. For each client, you can put either its name (`WEB`), or its numeric ID (<code>1</code> for web). The numeric ID can be either a string or a number, it does not matter which one.</li>
    <li><code>clientVersion</code> is the version of the client specified. This is so that older versions of say, the mobile app, can continue to work even after there is a new version, and the API changes.</li>
    <li><code>hl</code> (host location) is the two (most of the time) letter code of the language that InnerTube should give translated strings in.</li>
    <li><code>gl</code> (geolocation) is the two letter country code of the country that InnerTube should recommend content from.</li>
</ul>
    
<h3>Endpoints</h3>
<p>There are many different endpoints in InnerTube, for things like the watch page, homepage, and more. Each endpoint has its own specific properties that you should put in the request body. Check out the Endpoints section for information on these Endpoints!</p>
<h2>Response</h2>
The response varies heavily between endpoints. One thing in the response body that is always there is <code>responseContext</code>, which contains information about the response, such as the time it took, or if the user is signed in or not. There are also many different common object types that are used in the response data, so check out the Objects section if you want to learn more about one.
