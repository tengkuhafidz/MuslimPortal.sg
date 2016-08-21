import React, {Component} from 'react';

import {Events} from '../../api/events.js';

export default class EventPosterUpload extends Component {

 uploadImage (){

  event = this.props.eventDetails;
  eventId = event._id;
  //console.log("restaurant", restaurant)
  //var userId = Meteor.userId()
  var imageUrl = ""
  var widget = uploadcare.Widget('[role=uploadcare-uploader]');
  //console.log("in upload image", userId)
  widget.onUploadComplete(function(fileInfo) {
     console.log('fileInfo', fileInfo);
     console.log('file UUID', fileInfo.uuid);
     console.log('fileInfo.originalUrl', fileInfo.originalUrl); // Public CDN URL of the uploaded file, without any operations.
   imageUrl = fileInfo.cdnUrl;
   uuid = fileInfo.uuid;
   Meteor.call('eventImageUpload', eventId, imageUrl, uuid, function(error, result){
    if(error){
     Bert.alert(error, 'danger', 'fixed-bottom', 'fa-frown-o')
     return;
    }
   });

   Meteor.call('storeOnUplodcare', uuid, function(err,res){
    if(err){
     Bert.alert(err, 'danger', 'fixed-bottom', 'fa-frown-o')
     return;
    }
   });

   if(event.uuid){
    Meteor.call('deleteFromUploadcare', event.uuid, function(err, res) {
     console.log("err", err)
     console.log("res", res)
     if(err){
      Bert.alert(err, 'danger', 'fixed-bottom', 'fa-frown-o');
      return;
     } else{
      console.log("IMAGE UPLOAD SUCCESSFUL !")
      return;
     }
    })
   }
  });
 }

 render(){
  return (
   <div>
      <a className="uploader-button-restaurant-image right-align" onClick={this.uploadImage.bind(this)}>
        <input
         type="hidden"
         name="picture"
         role="uploadcare-uploader"
         data-images-only
         data-image-shrink="480x480"
         data-preview-step=""
        />
      </a>
   </div>
  )
 }
}
