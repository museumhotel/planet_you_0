# planet_you_paraterraformed
## 2021
### p5.js, glsl

The saying *"No man is an island"* acknowledges the inevitable help we receive to achieve the things we want. Thanks to all those that provided resources from the libraries I used to the help in the fxhash discord. Thank you! 🙌🏾 ❤️‍🔥

The first component was the fading grid which is a very simple 2D array filled in with a random colour.

I then layered the grid of rects with another grid of squares which produced a disco-ball/paillette effect that refills in a loop once a specified point in the grid reaches a certain colour value.

I wrapped this grid as a texture to the native p5js WEBGL 3D primitives; a sphere and torus shape creating the central planet motif. If humans covered a planet or moon with a structure intended to make the body habitable- the technical term for this process is [paraterraforming](https://marspedia.org/Paraterraforming). The title and main philosophical theme of this work makes reference to this.

The work makes use of the generative principle of parameterisation. The work itself will always *look* the same but the parameters will change and are determined by rules applied probabilistically. The *"Terraform_Flavour"* parameter reveals the chosen name for the exterior colour scheme of the paraterraformed *'shell'* structures covering the planet and it's orbiting ring. The names themselves are playful observations on what is natural and man-made. 

Rotating around the planetary body is a flat 3D plane shape with a noise graphic wrapped around it. Every click of the mouse on the window generates a new noise field. If an iteration happens to have an optimal contrast between the randomly assigned fill colour of the plane; and the low-strokeWeight, charteuse stroke colour of the shape comprising the noise, you can see each noise field being generated on the plane with each mouse click. The noise values are from the native p5.js noise() API which is sampled from [Perlin noise](https://genekogan.com/code/p5js-perlin-noise/).

This plane of noise rotates around the planet not so unlike a planet's actual electromagnetic field. There are 4 possible motion paths each with around 25% chance of occurence in each iteration and designated as the *"Noise_Graphic_Rotation"* feature. The result of taking the value of the frame count and either multiplying or dividing it by the *"Rotation_Speed"* feature: either 2, 4, 6 or 8.

We see this path of motion continuously redrawn because a background which prevents this behaviour hasn't been set. Joseph Choma's [Morphing A Guide to Mathematical Transformations for Architects and Designers](https://blackwells.co.uk/bookshop/product/Morphing-by-Joseph-Choma-author/9781780674131) has a chapter on *Combining Transformations* where you can see the maths behind some of the spiralling, thickening and pinching of this plane of noise as it rotates on its x and y axes.

The enclosing *frame* of the planet is comprised of a sea of fractal Brownian motion(fBm) rendered by the GPU throug a fragment shader. It's written in glsl and is a modification of the fBm code from the section on fBm in [The Book of Shaders.](https://thebookofshaders.com/13/)

I then modified it further, creating two distinct colour schemes, tweaking how the colour values are mixed with the noise, adding more grain and adjusting how the noise interacts with user input from the mouse. My instagram features an earlier version of this work which inverts the placement of the planes of fBm shader graphics and the noise graphics.

This work is intended to serve as an allegorical warning about chasing technological progress to avoid addressing societal issues which don't necessitate the most advanced technology to solve. Given the subject matter, it's important to note there's an irony in the fact this work was made available for free as an NFT on the Tezos marketplace, [fxhash](https://www.fxhash.xyz/u/museumhotel). 

Ultimately I'm sceptical of the NFT phenomenon but I can't deny the exposure it's given to the field of computational generative art. This work is a provocation to remember that *no man is an island*. And even while in unpredictable seas and surrounded by so much noise, it's understandable how some may naively think the answer requires abandoning everything and starting again on a new planet where you alone make all the rules, all life is trustless, every institution is decentralised and technology acts as the ultimate liberator. 
























