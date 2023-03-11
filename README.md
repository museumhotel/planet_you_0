# planet_you_paraterraformed
## 2022

### p5.js, glsl

### ([@museumhotel](https://www.fxhash.xyz/u/museumhotel))

The saying *"No man is an is an island"* acknowledges the inevitable help we receive to achieve the things we want. so I'd first like to thank all those that provided resources and guidance from the libraries I used to the help in the fxhash discord and also emotional support from friends and family. This genesis piece is dedicated to all of you and while it's fairly simple in concept and execution, it couldn't have been completed were it not for you, thank you! 🙌🏾 ❤️‍🔥

I started working on this in December 2021 as and when I could find time between my job as a juniour front-end dev at a start-up.

The first component was the fading grid which is a very simple 2D array filled in with a random colour. There are many tutorials to achieve this and it made for a good starting project with p5.js which is the main library this project makes use of.

I then layered the grid of rects with another grid of squares which produced a fun disco-ball/paillette effect that refills in a loop once a specified point in the grid reaches a certain colour value.

I wrapped this grid to a 3D sphere and torus shape which created the central planet motif. If humans covered a planet or moon with a structure intended to make the body habitable- the technical term for this process is [paraterraforming](https://marspedia.org/Paraterraforming). The title and main philosophical theme of this work makes reference to this.

The *"Terraform_Flavour"* feature reveals the chosen name for the exterior colour scheme of the paraterraformed *'shell world'* structures covering the planet and it's orbiting ring. The names themselves are playful observations on what is natural and man-made. Even through the medium of code, as creators we still draw reference and find beauty in the natural **and** unnatural world around us.

Rotating around the planetary body is a flat 3D plane shape with a noise graphic wrapped around it. Every click of the mouse on the window generates a new noise field. If an iteration happens to have an optimal contrast between the randomly assigned fill colour of the plane; and the low-strokeWeight, charteuse stroke colour of the shape comprising the noise, you can see each noise field being generated on the plane with each mouse click.

This plane of noise rotates around the planet not unlike a fantastical electromagnetic field following an unusual but still regular pattern. There are 4 possible motion paths each with around 25% chance of occurence in each iteration and designated as the *"Noise_Graphic_Rotation"* feature. The result of taking the value of the frame count and either multiplying or dividing it by the *"Rotation_Speed"* feature: either 2, 4, 6 or 8.

We see this path of motion continuously redrawn because a background which prevents this behaviour hasn't been set. Joseph Choma's [Morphing A Guide to Mathematical Transformations for Architects and Designers](https://blackwells.co.uk/bookshop/product/Morphing-by-Joseph-Choma-author/9781780674131) has a chapter on *Combining Transformations* where you can see the maths behind some of the spiralling, thickening and pinching of this plane of noise as it rotates on its x and y axes.

The enclosing *frame* of the planet is comprised of a sea of fractal Brownian motion(fBm) rendered by the GPU throug a fragment shader. It's written in glsl and I wrote it by following a shader course that I have access to by paying for a superHi membership. In the course, we take and modify the fBm code from the freely available section on fBm in [The Book of Shaders.](https://thebookofshaders.com/13/)

I then modified it further, creating two distinct colour schemes, tweaking how the colour values are mixed with the noise, adding more grain and adjusting how the noise interacts with user input from the mouse.

My instagram features a version of this project which uses this primordial soup of fBm as a background to the planet and it's rotating plane of cosmic noise. This worked well in the online p5 editor but when I transported this to work on locally, the shader gods weren't having it so I inverted the order of solid backfround and fBm. The end result has a more decorative effect but I'm really happy with it.

This work pays mind to the adage of no man being an island but in unpredictable seas and surrounded by so much noise, it's understandable how someone may want to abandon everything and start again on a new planet where you make the rules and all life is trustless and decentralised. 

Through programming in my job I ask more questions and *(speaking for myself)* I've become more open to the infinite possibilities of achieveing different things. In some ways this work is an allegorical warning about chasing technological progress to avoid addressing issues which may not necessarily need the most advanced technology to solve. This work is an NFT and that's not insignificant to the implications of what I'm saying but hopefully others who are interested in and/or are making generative art will be open to the conversations I intend a work like this provoke while still exploring and learning about the medium and its tools. 
