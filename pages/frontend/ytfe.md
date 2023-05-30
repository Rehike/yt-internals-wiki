# YouTube Frontend (legacy)

The **YouTube Frontend** (YTFE), also known as Web Classic, was the legacy web frontend used by YouTube from 2006 until 2017. It has been replaced with the Polymer-based Web frontend used today. It was written in the Python programming language using the [Spitfire templating language](#!/backend/spitfire) for rendering HTML pages.

Although it was deprecated in 2017, it remained accessible until around 27 December 2020 for users who made an effort to continue using it. YTFE still receives minimal usage in some backroom pages of YouTube, including the embedded player and embedded subscription button pages.

Dating so far back, it was changed considerably throughout its lifetime. YouTube made many changes to it since 2006, including to both the internals of YouTube and the outer appearance.

## Name

Being such a broad thing, there isn't much in the way of names for this thing. Internal YouTube documents from as far back as 2013^[https://www.ccs.neu.edu/home/choffnes/nsf-meas-wkshp/slides/Terzis.pdf], as well as archives of the frontend from the mid-to-late 2010s, indicate that this was internally called "YTFE" for a time, an abbreviation for YouTube Frontend.

Experiment names seen in `yt.config_.EXPERIMENT_FLAGS`, which is a variable exposed in most YouTube responses for their JS scripts, demonstrate that after the Polymer web frontend was unveiled, the classic frontend was deemed `web_classic`.

## History

YouTube initially provided their service with only a PHP-based web frontend in 2005. PHP in YouTube was very short-lived. According to Erik Klein, a former YouTube employee from 2006 to 2009, the PHP frontend was already being done away with by the end of 2005 and was nearly completely replaced with Python by March of 2006, months prior to Google's acquisition.^[https://www.quora.com/Is-YouTube-still-written-in-PHP/answer/Erik-Klein] As such, it is likely that YouTube using Python was an independent decision, rather than one influenced by Google.

During 2006 and 2007, it is likely that YouTube used the [Cheetah templating language](http://www.cheetahtemplate.org/). This served as the direct inspiration for Spitfire, which YouTube had primarily used for templating since 2008.

The late 2000s were a time of rapid infrastructural change for YouTube. Between 2007 and 2009, YouTube moved to their own in-house software or Google-standard software for improving the speed of the website and their own programming experience. This includes [VFL](#!/backend/vfl) for simple-but-powerful static content management and [Spitfire](#!/backend/spitfire) for efficient rendering of HTML documents. They adopted Google Closure Compiler for compiling their JavaScript source code for faster and more efficient downloads.

In 2012, YouTube began the InnerTube project in order to improve their API infrastructure.^[https://gizmodo.com/how-project-innertube-helped-pull-youtube-out-of-the-gu-1704946491] This project coincided with development of the [Epic Panda](#!/frontend/hitchhiker#epic_panda) project, which most likely incorporated an implementation of InnerTube into the web frontend. This update would later culminate into the update to the website in December of that year with the Hitchhiker redesign.

Work started on [a replacement for YTFE in 2014 using Google's Polymer library](#!/frontend/polymer) for local, JavaScript-rendered pages. This rewrite would be publicly beta tested in 2016, and then fully released as the main YouTube frontend in 2017. YTFE would remain accessible for several more years during a transitional period, providing access to old pages which weren't updated and continuing to allow users of limited or outdated browsers to continue to access YouTube. YouTube officially deprecated YTFE in 2020, and shut it down in December of that year. The last few standard pages that were dependent on YTFE were either moved to Polymer or removed entirely in 2021. However, a few special pages still rely on YTFE to this day (notably the embedded player and embedded subscription button), but these do not have the standard page layout.

## JS source code leak

Between 2010 and 2013, YouTube leaked debug builds of their JS source code on their [static image server](#!/backend/static_image_server).^[https://archive.org/details/yt-debug-js] These source files are processed through Closure Compiler in whitespace-only mode with pretty-printed formatting, which made them easily readable for debugging purposes. While these files lack comments, the original symbol names and code flow is kept intact, so the code is still much more readable than the compiled versions that are regularly accessible.

However, the HTML5 video player source code did not leak in a similar way, possibly indicating that it used a different build mechanism for copy-protection purposes.

## References