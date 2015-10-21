//
//  Story.h
//  ssbuilder
//
//  Created by Ruiheng Wang on 9/23/15.
//  Copyright © 2015 Ruiheng Wang. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Story : NSObject

//@property (nonatomic, copy) NSString *title;
//@property (nonatomic, copy) NSString *caption;
@property (nonatomic, copy) NSString *name;

-(id)initWithNSDictionary:(NSDictionary *)storyInfo_;

@end
