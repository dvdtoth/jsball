/**
 * Created by dbreuer83 on 22/03/15.
 */
"use strict"



 var Effects = {
     /**
      * Ball shot effect
      * Get the vector when shot the ball
      * @param ballObject
      * @param vector {object} param x and param y
      * @returns {boolean}
      */
    shot: function(ballObject, vector) {
        console.log("SHOT")
        /**
         * ballObject
         * @param x
         * @param y
         */
        if (!ballObject) {
            console.error("ballObject doesn't exist! Error");
            return false;
        }

        try {
            this.move(ballObject, "cx", vector.x, 1000);
            this.move(ballObject, "cy", vector.y, 1000);
        } catch(e) {
            console.log("Effect Error");
        }

    },
     /**
      * Move element
      * @param element
      * @param attr
      * @param vector
      * @param duration
      */
     move: function(element, attr, vector, duration) {
         var quadEaseOut = this.makeEaseOut(this.quad);

        this.animate({
            delay: 10,
            duration: duration || 1000, // 1 sec by default
            delta: quadEaseOut,
            step: function(delta) {
                element.setAttribute(attr, (vector*delta) );
            }
        });

     },
     /**
      * Animate object
      * @param opts
      */
    animate: function(opts) {

        var start = new Date();

        var id = setInterval(function() {
            var timePassed = new Date() - start;
            var progress = timePassed / opts.duration;

            if (progress > 1) progress = 1;

            var delta = opts.delta(progress);
            opts.step(delta);

            if (progress == 1) {
                clearInterval(id)
            }
        }, opts.delay || 10)

    },
     /**
      * Bonunce effect delta
      * @param progress
      * @returns {number}
      */
     bounce: function(progress) {
        for(var a = 0, b = 1, result; 1; a += b, b /= 2) {
            if (progress >= (7 - 4 * a) / 11) {
                return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
            }
        }
    },
     /**
      * Quad effect delta
      * @param progress
      * @returns {number}
      */
     quad: function(progress) {
        return Math.pow(progress, 5)
    },
     /**
      * Ease Out effect
      * @param delta
      * @returns {Function}
      */
     makeEaseOut: function(delta) {
        return function(progress) {
            return 1 - delta(1 - progress)
        }
    },
     /**
      * Ease In Out effect
      * @param delta
      * @returns {Function}
      */
     makeEaseInOut: function(delta) {
        return function(progress) {
            if (progress < .5)
                return delta(2*progress) / 2;
            else
                return (2 - delta(2*(1-progress))) / 2
        }
    }

};
