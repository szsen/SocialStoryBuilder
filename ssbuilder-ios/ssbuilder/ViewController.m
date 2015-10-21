//
//  ViewController.m
//  ssbuilder
//
//  Created by Ruiheng Wang on 9/23/15.
//  Copyright © 2015 Ruiheng Wang. All rights reserved.
//

#import "ViewController.h"
#import "Story.h"
#import "MyTableViewController.h"

@interface ViewController ()
//@property (weak, nonatomic) IBOutlet UILabel *titleLabel;
//@property (weak, nonatomic) IBOutlet UILabel *captionLabel;
//@property (weak, nonatomic) IBOutlet UIImageView *storyImage;
//@property (weak, nonatomic) IBOutlet UITextField *inputField;
@property (weak, nonatomic) IBOutlet UILabel *nameLable;
@property MyTableViewController *myTVC;
@property NSMutableArray *nameMArray;
@property NSMutableArray *storyMArray;

@end

@implementation ViewController

@synthesize jsonObject;

- (void)viewDidLoad {
    [super viewDidLoad];
    
    
    // Do any additional setup after loading the view, typically from a nib.
//}

    //TODO: should be made dynamic to enforce student name/specific story access credentials
    //string for the URL request
    NSString *myUrlString = @"http://localhost:3000/api/students";
    //create a NSURL object from the string data
    NSURL *myUrl = [NSURL URLWithString:myUrlString];
    
    NSURLSession *urlSession = [NSURLSession sharedSession];
    [[urlSession dataTaskWithURL:myUrl completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
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
    }]resume];
    
    [self.navigationItem setTitle:@"Name Detail"];
    self.myTVC = [[MyTableViewController alloc] initWithStyle:UITableViewStyleGrouped];
    self.nameMArray = [[NSMutableArray alloc] init];
}

- (void) parseResponse: (NSData *) data{
    NSString *myData = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
    NSLog(@"JSON data = %@", myData);
    NSError *error = nil;
    //parsing the Json response
    jsonObject =[NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingAllowFragments error:&error];
    if(jsonObject != nil && error ==nil){
        NSLog(@"successfully deserialized...");
    }
    
    //self.titleLabel.text = [jsonObject objectForKey:@"title"];
    //self.captionLabel.text = [jsonObject objectForKey:@"description"];
    //self.captionLabel.text = [jsonObject objectForKey:@"description"];
    //TODO: NSData data with URL call is VERY SLOW--need to run on background thread?   
    //self.storyImage.image = [UIImage imageWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:[jsonObject objectForKey:@"url"]]]];
    //self.nameLable.text = [jsonObject objectForKey:@"name"];
    NSDictionary *dict = [jsonObject objectAtIndex:0];
    NSString *names = @"";
    //self.nameLable.text = [dict objectForKey:@"name"];
    for (int i = 0; i < [jsonObject count]; i++) {
        dict = [jsonObject objectAtIndex:i];
        NSString *curr = [dict objectForKey:@"name"];
        //NSLog(curr);
        names = [[names stringByAppendingString: curr] stringByAppendingString:@"  "];
    }
    NSArray *nameArray = [names componentsSeparatedByString:@"  "];
    [self.nameMArray addObjectsFromArray:nameArray];
    //self.nameLable.text = names;
    //NSLog(@"jso =%lu", (unsigned long)[jsonObject count]);
    
    [self.myTVC populateDataWithFirstItems:self.nameMArray];
    UINavigationController *navController = [[UINavigationController alloc] initWithRootViewController:self.myTVC];
    
    self.myTVC.title = @"Name List";
    
    [self presentViewController:navController animated:YES completion:nil];
    
    //NSString *instructorString = [[NSUserDefaults standardUserDefaults] objectForKey:@"instructor"];
    //NSLog(@"instuctor is: %@", instructorString);
    
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:YES];
    
    //create story object from dictionary data
    Story *story = [[Story alloc] initWithNSDictionary: jsonObject];
    //set the label values from the story object
    //self.titleLabel.text = [[NSString alloc] initWithFormat:@"Title = %@", story.title ];
    //self.captionLabel.text = [NSString stringWithFormat:@"Caption = %@", story.caption] ;
    //self.nameLable.text = [NSString stringWithFormat:@"Name = %@", story.name] ;
    self.nameLable.text = [[NSString alloc] initWithFormat:@"Name = %@", story.name ];
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
