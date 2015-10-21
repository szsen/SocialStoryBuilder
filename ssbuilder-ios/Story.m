//
//  Story.m
//  ssbuilder
//
//  Created by Ruiheng Wang on 9/23/15.
//  Copyright © 2015 Ruiheng Wang. All rights reserved.
//

#import "Story.h"

@implementation Story
//@synthesize title;
//@synthesize caption;
@synthesize name;

-(id)initWithNSDictionary:(NSDictionary *)storyInfo_{
    self = [super init];
    if (self) {
        
        NSDictionary *storyInfo = storyInfo_;
        NSLog(@"Story Info = %@", storyInfo);
        //self.title = [storyInfo  valueForKey:@"title"];
        //self.caption = [storyInfo  valueForKey:@"description"];
        self.name = [storyInfo  valueForKey:@"name"];
    }
    return self;
}
    
- (void) dealloc
    {
        //self.title = nil;
        //self.caption = nil;
        self.name = nil;
        
    }
@end




