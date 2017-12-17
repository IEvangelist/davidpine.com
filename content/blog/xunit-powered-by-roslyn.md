+++
author = "David Pine"
categories = ["Visual Studio", "xUnit", "Roslyn"]
date = "2017-11-11"
description = "Putting your code under the scope"
featured = "scope.jpeg"
featuredalt = ""
featuredpath = "date"
linktitle = ""
title = "xUnit Roslyn Analyzers"
type = "post"

+++

<style>p { opacity: 1 !important; }</style>

# Intro

At my day job, I wear many hats. I'm currently wearing the "upgrade our team's tooling" hat. <strong>I counted 99</strong> `*.xproj` and `project.json` based projects spanning four repositories that need to be updated to the revitalized `*.csproj` project format. With this the team can upgrade to the latest version of Visual Studio (finally upgrading to 2017 from 2015) and start taking advantage of the following:

 - Supported tooling, no longer on preview tooling bits
 - Allows us to <a href="blog/exploring-csharp-seven" target="_blank">explore C# 7</a> (and <a href="blog/csharp-seven-dot-one" target="_blank">peruse C# 7.1</a>) with production code
 - Leverage the latest SDK and `.NET Core` CLI
 - Other obvious reasons
 - And so on...

 Upgrading tooling is not always glamorous, but there are times that I find myself excited. I thoroughly enjoy learning about the new tooling innovations and efforts around simplifying the development work-flow, especially when it involves C# and Visual Studio.

## An "OMG, WTF" Moment

I mandate that our projects _"treat warnings as errors"_. After migrating the first solution over, 15 of the 30 projects had compilation errors. It's worth mentioning that we maintain a 1-to-1 ratio between class libraries and unit-test projects. Much to my surprise the 15 projects that had compilation errors were only unit-test projects. The reason that they stopped compiling was due to seemingly countless <strong>xUnit</strong> warnings, generated by various <strong>Roslyn</strong> analyzers. I was shocked by the number of warnings that were discovered. 

## The Realization

As one might imagine -- there are a lot of unit tests in 15 projects. This was an opportunity for <strong>Roslyn</strong> and <strong>xUnit's</strong> analyzers to shine, and shine they did! At first I was frustrated...thinking something like "FML, of course there is an issue" but upon further investigation I discovered that these were all perfectly reasonable warnings. In fact, several of them made me question how some tests ever passed at all. I was impressed by the power of this tooling addition. While <strong>Roslyn</strong> has been around for a while, I have not personally observed a large uptake in its abilities. Needless to say, I was thrilled to see the <strong>xUnit</strong> team leveraging it so much -- this is inspiring!

Visual Studio 2017 will display the analyzers that are available within a project under Dependencies > Analyzers.  

![Analyzers](/img/2017/11/analyzers.png)

As you can see they have put a lot of thought and effort into this. There are tons of various rules,<a href="https://xunit.github.io/xunit.analyzers/rules/" target="_blank">here is a comprehensive listing of them all.</a>

## <a href="https://github.com/xunit/xunit" target="_blank"><i class="fa fa-github-square" aria-hidden="true"></i> xUnit</a>

I'm dating my <strong>xUnit</strong> efforts here a bit, but I've been a fan of <strong>xUnit</strong> for a long time now! Back in the days of "DNX", or as Scott Addie might ask <a href="https://twitter.com/Scott_Addie/status/928021703619379201" target="_blank">"DMX?"</a>. In a time when I was still on <a href="https://ievangelistblog.wordpress.com/" target="_blank"><i class="fa fa-wordpress" aria-hidden="true"></i> Wordpress</a>, before I was enlightened my Steve Hicks who says:

> <p/> If you aren't putting out as many posts as BuzzFeed, you can probably just build your blog statically
> <cite><a href="https://twitter.com/pepopowitz" target="_blank">Steve Hicks</a></cite>

<a href="https://ievangelistblog.wordpress.com/2016/02/12/asp-net-core-1-0-unit-testing/" target="_blank">Here is a post</a> from February 2016 where I flexed some of the <strong>xUnit</strong> capabilities. Again, I've been a fan of <strong>xUnit</strong> for a long time now. It is incredibly 

## <a href="https://github.com/dotnet/roslyn" target="_blank"><i class="fa fa-github-square" aria-hidden="true"></i> Roslyn</a>

If you're unfamiliar with <strong>Roslyn</strong>, it is the `.NET` Compiler Platform.

> <p/> Roslyn provides open-source C# and Visual Basic compilers with rich code analysis APIs. It enables building code analysis tools with the same APIs that are used by Visual Studio.

Visual Studio relies on <strong>Roslyn</strong> for lots of things. All of the aforementioned <strong>xUnit</strong> rules are defined as <strong>Roslyn</strong> analyzers. These analyzers are executed within Visual Studio, providing a great developer experience. They help you write better code.

## Visual Studio -- Warnings

This section will serve as a brief listing of some of the warnings that I encountered. When writing a unit-test that uses `Theory` paired with `InlineData`, if there are duplicates -- this is flagged.

<a href="https://xunit.github.io/xunit.analyzers/rules/xUnit1025" target="_blank" title="xUnit Warning 1025">
![Inline Duplicate](/img/2017/11/inline-dup.png)
</a>

When you mistakenly define a unit-test method parameter that is not used, it's flagged.

<a href="https://xunit.github.io/xunit.analyzers/rules/xUnit1026" target="_blank" title="xUnit Warning 1026">
![Remove Parameter](/img/2017/11/remove-parameter.png)
</a>

When your unit-test is attempting to check whether a collection "does not contain" something, and does so with an `Assert.False(collection.Any(...));` -- it is flagged.

<a href="https://xunit.github.io/xunit.analyzers/rules/xUnit2012" target="_blank" title="xUnit Warning 2012">
![Use Does Not Contain](/img/2017/11/use-doesnotcontain.png)
</a>

This one might be my favorite -- if you incorrectly `Assert.NotNull` on a value-type (that can never be `null`) -- it is flagged.

<a href="https://xunit.github.io/xunit.analyzers/rules/xUnit2002" target="_blank" title="xUnit Warning 2002">
![Remove Call](/img/2017/11/remove-call.png)
</a>

When you call `Assert.Equal` and the expected argument is `null` -- it is flagged.

<a href="https://xunit.github.io/xunit.analyzers/rules/xUnit2003" target="_blank" title="xUnit Warning 2003">
![Use Null](/img/2017/11/use-null.png)
</a>

I also ran into two variations of the <a href="https://xunit.github.io/xunit.analyzers/rules/xUnit2013" target="_blank"><strong>xUnit:2013</strong> warning</a> which states the following:

> <p/> Do not use equality check to check for collection size

In one scenario I had some unit test code similar to `Assert.Equal(0, values.Count);`, the analyzer instead suggested `Assert.Empty(values);`. This was my intent anyways, so of course I was happy to accept the recommended change.

Likewise I had an `Assert.Equal(1, values.Count);` and the analyzer suggested `Assert.Single(values);`. I was ensuring that the collection had only a single value, so once again <strong>xUnit</strong> was correct. Again, my appreciation for this tooling enhancement cannot be overstated.

# Thank you

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I am so pleased with the <a href="https://twitter.com/xunit?ref_src=twsrc%5Etfw">@xunit</a> team&#39;s <a href="https://twitter.com/roslyn?ref_src=twsrc%5Etfw">@roslyn</a> analyzers, <a href="https://t.co/DAVuVsAGmQ">https://t.co/DAVuVsAGmQ</a>. These are amazing, literally changing the unit testing game. I literally love everything about what xUnit has done for C# unit testing. <a href="https://t.co/ROrNQAf6NW">pic.twitter.com/ROrNQAf6NW</a></p>&mdash; David Pine (MVP) (@davidpine7) <a href="https://twitter.com/davidpine7/status/928805436761010176?ref_src=twsrc%5Etfw">November 10, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Further reading

If you're curious about <strong>xUnit</strong> or <strong>Roslyn</strong>, please checkout the resources below:

- <a href="https://github.com/xunit/xunit" target="_blank"><i class="fa fa-github-square" aria-hidden="true"></i> &nbsp; xUnit -- GitHub.com</a>
- <a href="https://xunit.github.io/xunit.analyzers/rules/" target="_blank"><i class="fa fa-github-square" aria-hidden="true"></i> &nbsp; xUnit Analyzer Rules -- GitHub.io</a>