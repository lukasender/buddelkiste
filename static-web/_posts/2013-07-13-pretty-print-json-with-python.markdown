---
layout: post
title:  "Pretty-Print JSON with Python!"
date:   2013-07-13 13:38:42
categories: coding
tags: python json terminal
---
I am currently working on some RESTful web services. A REST API is pretty
awesome. In most cases it is easy to use. The data which is being transfered is
in many cases JSON formatted. But there are other possibilities too, like XML,
CSV, etc.

Let's say, your REST API you are working on provides JSON formatted data. When
it comes to testing, I often use the command line and fire up a quick `curl`
command.  Something like follows:

{% highlight bash %}
curl -v -H "Accept: application/json" -X GET -d http://localhost/api/endpoint
{% endhighlight %}

The app will then respond with the JSON data. Similar to:

{% highlight json %}
{ "json": "is", "pretty": "awesome" }
{% endhighlight %}

That's quite nice but as your JSON data becomes [more complex][twitter-api],
it will get kind of hard to read. Wouldn't it be great if there was a little
helper around to make the stuff more readable?  Well, you are lucky.  There is
Python to help you out.

Try it yourself:

{% highlight bash %}
echo '{"json": "+", "python": "=", "uber-awesome": true}' | python -mjson.tool
{% endhighlight %}

Output:

{% highlight json %}
{
    "json": "+",
    "python": "=",
    "uber-awesome": true
}
{% endhighlight %}

Happy coding! ;)

[twitter-api]:  https://dev.twitter.com/rest/reference/get/trends/available
