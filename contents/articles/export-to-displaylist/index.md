---
title: Exporting to a Hard Coded OpenGL DisplayList
author: Jason Lambert
date: 2016-10-06
template: article.jade
---

[Python is now incorporated][pythonissue] in my [Carving Castles project][castle] and the next step is to [write a nice little export script][exportissue]. Before I jump into Python, however, I need to do a little research and field testing. [Carving Castles][castle] depends on the awesome graphics library [libGDX][libgdx], which stores it 3D information in a very straightforward manner, thankfully. A quick glance at the [Javadocs][libgdxdocs] shows us that the [mesh][meshdoc] class is our target.

<span class="more"></span>






[xoppa]: https://github.com/xoppa/blog/blob/master/tutorials/assets/loadscene/data/ship.obj
[castle]: https://github.com/selfVSmind/carvingcastles
[exportissue]: https://github.com/selfVSmind/carvingcastles/issues/3
[pythonissue]: https://github.com/selfVSmind/carvingcastles/issues/1
[libgdx]: https://libgdx.badlogicgames.com/
[libgdxdocs]: https://libgdx.badlogicgames.com/nightlies/docs/api/
[meshdoc]: https://libgdx.badlogicgames.com/nightlies/docs/api/com/badlogic/gdx/graphics/Mesh.html
