# VFL

**VFL**, an abbreviation for **Versioned File Layout**, is the tool that YouTube used since 2009 for hosting differently-versioned copies of their static assets on [the `s.ytimg.com` server](#!/backend/static_image_server). It replaces an earlier, undocumented versioning system that was briefly used in 2007 and 2008. It appears to be still in use today, although in a heavily-modified state, no longer using the VFL identifier.

VFL is a Python tool for web hosts to use in order to host different versions of site files. This is done to allow consistent updates to a website's images and styling, while not breaking old, unmaintained pages that may still rely on old versions. This is done by appending a version identifier to the filename, which is in turn appended to all references to that file. This additionally acts as a cache buster, preventing the user's browser from loading the old version from its cache and potentially causing errors.

Although the tool has received some use from other services, most notably Dropbox, it is likely that VFL was written by YouTube initially and then shared with these other users.

## Source code release

Although it is unknown if this was an accidental leak or if the utility was meant to be open source, the VFL source code is known to be available on the internet outside of YouTube's purposes. It has hardcoded references to "google3" and YouTube in its utility scripts, indicating that the released source code was meant to be ran on YouTube production servers.

The source code was released on Google Code by Mike Solomon, one of YouTube's early software engineers, and subsequently exported to GitHub.

The release is quite old (last updated in 2010), and lacks some features that were added to VFL by YouTube in the following years, including "VFL sets" for organized code modules.