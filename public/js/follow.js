var $followBtn = $( "#follow-btn" );

    if( $followBtn.length ) {
        $followBtn.click(function() {
            var data = {
                follower: $followBtn.data( "follower" ),
                following: $followBtn.data( "following" ),
                action: $followBtn.data( "action" )
            };

            $.post( "/follow", data, function( res ) {
              if( res.done ) {  
                var text = $followBtn.data( "action" ) === "follow" ? "Unfollow" : "Follow";
                var count = parseInt( $( "#followers" ).text(), 10 );

                if( text === "Unfollow" ) {
                    $( "#followers" ).text( count + 1 );
                    $followBtn.data( "action", "unfollow" ).text( text );
                } else {
                    $( "#followers" ).text( count - 1 ); 
                    $followBtn.data( "action", "follow" ).text( text );
                }
              }  
            });
        });
    }