import React from "react";
import Sidebar from "../components/Sidebar";

const LoremIpsum = () => {
    console.log("lorem ipsum");
    return (
        <div>
            <Sidebar />
            <p style={{paddingLeft: '250px'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                egestas interdum metus, a gravida dolor pellentesque et. Nunc
                semper justo in massa sagittis, vel posuere neque pharetra.
                Pellentesque accumsan ante vel laoreet dictum. Curabitur porta
                sit amet nisi vitae ornare. Etiam dignissim nunc ex, a tempor
                enim tristique ac. Suspendisse vel elementum nisi, et lacinia
                erat. Fusce pulvinar volutpat convallis. Vestibulum ut nisi
                sodales, hendrerit dolor quis, varius eros. Vestibulum eget nunc
                eu turpis bibendum facilisis nec at orci. Vestibulum blandit
                eros suscipit leo consectetur, at dapibus est porta. Nunc
                pretium condimentum nunc, et convallis justo interdum sed.
                Suspendisse sapien tellus, tempus in ante at, aliquam gravida
                tellus. Mauris nibh nunc, varius sed molestie at, lacinia quis
                purus. In elementum, magna sed pharetra consectetur, nibh augue
                dictum dolor, quis sagittis purus magna eget nulla. Sed tortor
                est, placerat sit amet sapien id, euismod lacinia orci. Fusce
                quis porta nunc, et bibendum neque. Nullam tellus arcu, luctus
                in finibus sit amet, eleifend eget nisi. Donec a sollicitudin
                metus. Phasellus a fringilla leo. Sed nec felis pellentesque,
                pretium nibh a, semper ligula. Vestibulum nec turpis magna. Ut
                ultricies ultricies nulla id mattis. Pellentesque posuere libero
                fermentum enim lobortis rutrum. Mauris ac leo.
            </p>
        </div>
    );
};

export default LoremIpsum;
