/**
 * Created by dbreuer83 on 22/03/15.
 */
"use strict"



 var Effects = {

    shot: function(ballObject) {
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
        var BallEffectGlobal = {
            t: 1,
            c: 10,
            d: 10
        };




        try {
            this.move(ballObject, "cx", 350, 1000);
            this.move(ballObject, "cy", 140, 1000);
        } catch(e) {
            console.log("Effect Error");
        }

        /**
         *
         * @param t current time
         * @param b start value
         * @param c change in value
         * @param d duration
         * @returns {*}
         */

    },
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
     bounce: function(progress) {
        for(var a = 0, b = 1, result; 1; a += b, b /= 2) {
            if (progress >= (7 - 4 * a) / 11) {
                return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
            }
        }
    },
     quad: function(progress) {
        return Math.pow(progress, 5)
    },

     makeEaseOut: function(delta) {
        return function(progress) {
            return 1 - delta(1 - progress)
        }
    },
     makeEaseInOut: function(delta) {
        return function(progress) {
            if (progress < .5)
                return delta(2*progress) / 2;
            else
                return (2 - delta(2*(1-progress))) / 2
        }
    }

};
