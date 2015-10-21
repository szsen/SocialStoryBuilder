//
//  ViewController.m
//  ssbuilder
//
//  Created by Ruiheng Wang on 9/23/15.
//  Copyright © 2015 Ruiheng Wang. All rights reserved.
//

#import "ViewController.h"
#import "Story.h"

@interface ViewController ()

@end

@implementation ViewController

@synthesize title;
@synthesize caption;
@synthesize jsonObject;

- (void)viewDidLoad {
    [super viewDidLoad];
    
    
    // Do any additional setup after loading the view, typically from a nib.
//}

//- (void) getInfo{
    //string for the URL request
    NSString *myUrlString = @"http://localhost:3000/api/stories";
    //create a NSURL object from the string data
    NSURL *myUrl = [NSURL URLWithString:myUrlString];
    
    //create a http request
    NSMutableURLRequest *urlRequest = [NSMutableURLRequest requestWithURL:myUrl];
    //sets the receiver’s timeout interval, in seconds
    [urlRequest setTimeoutInterval:30.0f];
    //sets the receiver’s HTTP request method
    [urlRequest setHTTPMethod:@"GET"];
    
    //allocate a new operation queue
    NSOperationQueue *queue = [[NSOperationQueue alloc] init];
    //loads the data for a URL request
    [NSURLConnection sendAsynchronousRequest: urlRequest queue:queue completionHandler:^(NSURLResponse *response, NSData *data, NSError *error) {
        if ([data length] >0 && error == nil){
            //process the JSON response
            //use the main queue so that we can interact with the screen
            dispatch_async(dispatch_get_main_queue(), ^{
                [self parseResponse:data];
            });
        }
        else if ([data length] == 0 && error == nil){
            NSLog(@"Empty Response, not sure why?");
        }
        else if (error != nil){
            NSLog(@"Not again, what is the error = %@", error);
        }
    }];
    
    [self.navigationItem setTitle:@"Story Detail"];
    
    //bunch of labels for story information
    CGRect myFrame = CGRectMake(10.0f, 10.0f, 250.0f, 30.0f);
    self.title = [[UILabel alloc] initWithFrame:myFrame];
    self.title.font = [UIFont boldSystemFontOfSize:20.0f];
    [self.view addSubview:self.title];
    
    myFrame.origin.y += 25.0f;
    self.caption = [[UILabel alloc] initWithFrame:myFrame];
    [self.view addSubview:self.caption];
}

- (void) parseResponse: (NSData *) data{
    NSString *myData = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
    NSLog(@"JSON data = %@", myData);
    NSError *error = nil;
    //parsing the Json response
    id jsonObject =[NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingAllowFragments error:&error];
    if(jsonObject != nil &&error ==nil){
        NSLog(@"successfully deserialized...");
    }
    
    
    
    self.title.text = [jsonObject objectForKey:@"title"];
    self.caption.text = [jsonObject objectForKey:@"description"];
    
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:YES];
    
    //create story object from dictionary data
    Story *story = [[Story alloc] initWithNSDictionary: jsonObject];
    //set the label values from the story object
    self.title.text = [[NSString alloc] initWithFormat:@"Title = %@", story.title ];
    self.caption.text = [NSString stringWithFormat:@"Caption = %@", story.caption] ;
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
