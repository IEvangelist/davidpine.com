+++
title = 'Speaking'
description = 'A fairly complete listing of past and upcoming speaking engagements'
images = ["/img/main/me.png"]
date = '2017-04-20'
+++

I love being able to give back to the community and I enjoy how gratifying it can be. Public speaking on technologies 
that I love or on professional skills development is just one of the ways I give back. Anytime that I get to express myself and share my passions - I'm absolutely thrilled. Here is where I have been and where I'm going to be, I hope to see you there!

<div data-gist='7e423ddad9d8915dc9077b805844905e'>
    <h2>Loading schedule... <i class="fa fa-cog fa-spin fa-lg fa-fw"></i></h2>
</div>

<script type='text/javascript'>
    $(document).ready(() => {
        let attemptsRemaining = 5;
        const getGist = () => {
            $('[data-gist]').gist();
            setTimeout(() => { 
                const link = $('[data-gist] > a');
                if (link && link.length && link[0].innerHTML === "View gist") {
                    if (attemptsRemaining > 0) {
                        getGist();
                        attemptsRemaining--;
                    }
                } else {
                    $('.gist a').attr('target', '_blank');
                }
             }, 350);
        }

        setTimeout(() => getGist(), 1);
    });
</script>